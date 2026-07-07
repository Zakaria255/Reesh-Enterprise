'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

/**
 * HeroRipple — subtle WebGL water/displacement ripple over the hero image.
 * The cursor seeds soft ripples that refract the image texture and fade (~1.2s).
 * - Lazy client-only (imported via next/dynamic, ssr:false).
 * - Disabled entirely on prefers-reduced-motion and on touch/coarse pointers.
 * - Paused when the hero is off-screen (IntersectionObserver).
 * - Degrades gracefully: on any WebGL failure it renders nothing and the
 *   static <Image> beneath stays visible.
 */
const MAX_RIPPLES = 12;

const VERT = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uTexResolution;
  uniform float uTime;
  uniform vec3 uRipples[${MAX_RIPPLES}]; // x, y (uv), startTime

  // object-cover with anchor (0..1)
  vec2 coverUV(vec2 uv, vec2 res, vec2 tex, vec2 anchor) {
    float rr = res.x / res.y;
    float tr = tex.x / tex.y;
    vec2 scale = rr > tr ? vec2(1.0, tr / rr) : vec2(rr / tr, 1.0);
    vec2 offset = (1.0 - scale) * anchor;
    return uv * scale + offset;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 disp = vec2(0.0);
    float caustic = 0.0;

    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec3 r = uRipples[i];
      float age = uTime - r.z;
      if (age < 0.0 || age > 2.0) continue;
      vec2 d = (vUv - r.xy) * vec2(aspect, 1.0);
      float dist = length(d);
      float env = exp(-age * 3.0) * exp(-dist * 7.0);   // localized, ~1.2s decay
      float wave = sin(dist * 34.0 - age * 7.0) * env;
      disp += normalize(d + 1e-5) * wave * 0.010;
      caustic += max(wave, 0.0) * env;
    }

    vec2 uv = coverUV(vUv + disp, uResolution, uTexResolution, vec2(1.0, 0.5));
    vec4 color = texture2D(uTexture, uv);
    // very subtle brand-blue caustic highlight
    color.rgb += vec3(0.0, 0.62, 0.82) * caustic * 0.10;
    gl_FragColor = color;
  }
`;

export default function HeroRipple({ src, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guard rails: reduced motion + coarse (touch) pointers → skip entirely.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    let renderer, program, mesh, raf, io;
    let visible = true;
    let running = false;
    let start = performance.now();
    const parent = canvas.parentElement;

    // ripple ring buffer (flat vec3 array)
    const ripples = new Float32Array(MAX_RIPPLES * 3);
    for (let i = 0; i < MAX_RIPPLES; i++) ripples[i * 3 + 2] = -1000; // inactive
    let slot = 0;
    let lastSeed = 0;
    let lastPos = null;

    try {
      renderer = new Renderer({ canvas, alpha: true, dpr: Math.min(window.devicePixelRatio || 1, 2), antialias: false });
    } catch {
      return; // WebGL unavailable → static image beneath remains
    }
    const gl = renderer.gl;

    const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const uTexRes = [1920, 1080];

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTexture: { value: texture },
        uResolution: { value: [1, 1] },
        uTexResolution: { value: uTexRes },
        uTime: { value: 0 },
        uRipples: { value: ripples },
      },
    });
    mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();
    window.addEventListener('resize', resize);

    // Load the texture image
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      texture.image = img;
      uTexRes[0] = img.naturalWidth || 1920;
      uTexRes[1] = img.naturalHeight || 1080;
    };
    img.src = src;

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      const now = performance.now();
      const moved = lastPos ? Math.hypot(x - lastPos.x, y - lastPos.y) : 1;
      if (now - lastSeed < 40 || moved < 0.008) return; // throttle + min distance
      lastSeed = now;
      lastPos = { x, y };
      slot = (slot + 1) % MAX_RIPPLES;
      ripples[slot * 3] = x;
      ripples[slot * 3 + 1] = y;
      ripples[slot * 3 + 2] = (now - start) / 1000;
    };
    parent.addEventListener('pointermove', onMove);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      start = performance.now() - program.uniforms.uTime.value * 1000;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 }
    );
    io.observe(parent);
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('pointermove', onMove);
      io?.disconnect();
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
