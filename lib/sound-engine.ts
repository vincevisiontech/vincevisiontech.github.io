/**
 * Tiny WebAudio synth — zero audio assets. All sounds are generated:
 * UI blips, ambient hum, boot ticks and an ignition sweep.
 * Everything is silent unless explicitly enabled (muted by default).
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private humNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  enabled = false;

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (on) {
      this.ensure();
      this.startHum();
    } else {
      this.stopHum();
    }
  }

  blip(freq = 880, duration = 0.06, type: OscillatorType = "square", volume = 0.04) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  private startHum() {
    const ctx = this.ensure();
    if (!ctx || this.humNodes.length) return;
    [55, 82.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      gain.gain.value = 0.012;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      this.humNodes.push({ osc, gain });
    });
  }

  private stopHum() {
    this.humNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + 0.2);
        osc.stop(this.ctx!.currentTime + 0.25);
      } catch {
        /* already stopped */
      }
    });
    this.humNodes = [];
  }

  ignition() {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.9);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.15);
  }
}

export const soundEngine = new SoundEngine();
