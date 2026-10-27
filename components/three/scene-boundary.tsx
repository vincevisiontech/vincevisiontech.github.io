"use client";

import { Component, type ReactNode } from "react";

/**
 * WebGL is optional infrastructure. If WebGL fails to initialize (old GPU,
 * blocked context, runtime error inside the canvas), we fall back to a
 * static CSS hologram instead of crashing the page.
 */
export class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
