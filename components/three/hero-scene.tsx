"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const NAIROBI = { lat: -1.2921, lon: 36.8219 };
const LONDON = { lat: 51.5074, lon: -0.1278 };
const GLOBE_R = 1.55;

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* -------------------------------------------------------------------------- */
/*  Holographic globe — custom GLSL fresnel + procedural grid                  */
/* -------------------------------------------------------------------------- */

const globeVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

const globeFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  float gridLine(float v) {
    float f = fract(v);
    float d = min(f, 1.0 - f);
    return smoothstep(0.045, 0.0, d);
  }

  void main() {
    float fresnel = pow(1.0 - clamp(dot(vNormal, vView), 0.0, 1.0), 2.4);

    float lat = gridLine(vPos.y * 2.2);
    float lon = gridLine(atan(vPos.z, vPos.x) * 3.0 / 3.14159);
    float grid = clamp(lat + lon, 0.0, 1.0);

    float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + vPos.y * 4.0);
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    vec3 violet = vec3(0.659, 0.333, 0.969);
    vec3 base = mix(cyan, violet, 0.35 + 0.35 * pulse);

    vec3 color = base * (0.12 + grid * 0.55) + base * fresnel * 1.25;
    float alpha = clamp(0.18 + grid * 0.35 + fresnel * 0.85, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

function Globe() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_R, 72, 72]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={globeVertex}
        fragmentShader={globeFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Connection arcs with animated data pulses                                  */
/* -------------------------------------------------------------------------- */

const arcVertex = /* glsl */ `
  varying float vU;
  void main() {
    vU = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragment = /* glsl */ `
  uniform float uTime;
  varying float vU;
  void main() {
    float head = fract(uTime * 0.35);
    float pulse = smoothstep(0.08, 0.0, abs(vU - head));
    float trail = smoothstep(0.35, 0.0, abs(vU - head)) * 0.6;
    float base = 0.22;
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    vec3 violet = vec3(0.659, 0.333, 0.969);
    vec3 color = mix(cyan, violet, vU) * (base + pulse * 2.2 + trail);
    gl_FragColor = vec4(color, base + pulse + trail);
  }
`;

function Arc() {
  const pulseRef = useRef<THREE.Mesh>(null);

  const { lineObject, curve } = useMemo(() => {
    const start = latLonToVec3(NAIROBI.lat, NAIROBI.lon, GLOBE_R * 1.01);
    const end = latLonToVec3(LONDON.lat, LONDON.lon, GLOBE_R * 1.01);
    const mid = start.clone().add(end).normalize().multiplyScalar(GLOBE_R * 1.42);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
    const material = new THREE.ShaderMaterial({
      vertexShader: arcVertex,
      fragmentShader: arcFragment,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lineObject = new THREE.Line(geometry, material);
    return { lineObject, curve };
  }, []);

  const nodePoints = useMemo(
    () => [
      latLonToVec3(NAIROBI.lat, NAIROBI.lon, GLOBE_R * 1.02),
      latLonToVec3(LONDON.lat, LONDON.lon, GLOBE_R * 1.02),
    ],
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const material = lineObject.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = t;
    if (pulseRef.current) {
      const p = curve.getPoint((t * 0.35) % 1);
      pulseRef.current.position.copy(p);
    }
  });

  return (
    <group>
      <primitive object={lineObject} />
      {nodePoints.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color={i === 0 ? "#22d3ee" : "#a855f7"} />
        </mesh>
      ))}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#e0faff" />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cursor-reactive particle field                                             */
/* -------------------------------------------------------------------------- */

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += (pointer.y * 0.18 - ref.current.rotation.x) * 0.04;
    ref.current.position.x += (pointer.x * 0.35 - ref.current.position.x) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#67e8f9"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (pointer.y * 0.22 - group.current.rotation.x) * 0.05;
  });
  return (
    <group ref={group}>
      <Globe />
      <Arc />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Canvas wrapper                                                             */
/* -------------------------------------------------------------------------- */

export default function HeroScene({ bloom = true }: { bloom?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active] = useInViewport(wrapRef);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.45, 5.1], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Rig />
        <ParticleField />
        {bloom && (
          <EffectComposer>
            <Bloom intensity={0.85} luminanceThreshold={0.12} luminanceSmoothing={0.4} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

/** Pause rendering when the scene scrolls out of view. */
function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return [active] as const;
}
