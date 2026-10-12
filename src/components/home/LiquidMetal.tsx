"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FRAGMENT, VERTEX } from "./liquidMetalShader";

/**
 * The hero's liquid-metal backdrop: a pool of flowing chrome drawn edge to edge
 * by a fragment shader (see liquidMetalShader.ts), pushed around by the pointer.
 *
 * It is never blank, from the first paint on:
 *  - A poster — the shader's own first frame, rendered once and saved as a
 *    10 KB webp — is preloaded with the page and sits underneath at all times.
 *  - The live canvas fades in over it only after it has actually drawn a frame,
 *    and since that frame is the poster, the hand-over is invisible.
 *  - If WebGL is unavailable or the context is lost, the canvas hides and the
 *    poster simply stays.
 *
 * Costs are kept in check because this sits above the fold on every visit:
 *  - rendering pauses while scrolled away or in a background tab;
 *  - resolution adapts to the frame time (80% down to 30% of native), and a
 *    machine that still cannot keep up settles on a still frame — but only
 *    after a grace period, so the jank of the page loading never counts;
 *  - under prefers-reduced-motion it draws a single still frame.
 *
 * To regenerate the poster after changing the shader, render it at
 * uTime = STILL_TIME with the pointer off and save it over
 * public/images/hero-liquid-poster.webp.
 */

const STILL_TIME = 7;
const MIN_SCALE = 0.3;
/** Frames in the first moments after start are slow because the page is still loading. */
const GRACE_MS = 1500;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
}

export function LiquidMetal({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 h-full w-full";
    // Hidden until it has drawn; the poster underneath covers the gap.
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 600ms ease";
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");

    wrap.appendChild(canvas);

    let scale = 0.8;
    let width = 0;
    let height = 0;
    let shown = false;
    let lost = false;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25) * scale;
      const w = Math.max(1, Math.round(wrap.clientWidth * dpr));
      const h = Math.max(1, Math.round(wrap.clientHeight * dpr));
      if (w === width && h === height) return;
      width = canvas.width = w;
      height = canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    // Pointer: eased toward the target so the surface swells rather than snaps.
    const target = { x: 0.5, y: 0.5, on: 0 };
    const pointer = { x: 0.5, y: 0.5, on: 0 };
    const area = wrap.closest("section") ?? wrap;
    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = 1 - (event.clientY - rect.top) / rect.height;
      target.on = 1;
    };
    const onLeave = () => {
      target.on = 0;
    };

    let raf = 0;
    let visible = true;
    let last = performance.now();
    const startedAt = last;
    let clock = STILL_TIME;
    let slow = 0;

    const draw = () => {
      if (lost) return;
      resize();
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, clock);
      gl.uniform3f(uPointer, pointer.x, pointer.y, pointer.on);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // Reveal on the frame after the first draw, once it has been composited.
      if (!shown) {
        shown = true;
        requestAnimationFrame(() => {
          if (!lost) canvas.style.opacity = "1";
        });
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (lost || !visible || document.hidden) return;
      const frameTime = (now - last) / 1000;
      const dt = Math.min(frameTime, 0.1);
      last = now;
      clock += dt;
      const ease = 1 - Math.exp(-dt * 4);
      pointer.x += (target.x - pointer.x) * ease;
      pointer.y += (target.y - pointer.y) * ease;
      pointer.on += (target.on - pointer.on) * (1 - Math.exp(-dt * 2.5));
      draw();

      // Adapt to the machine: shrink the resolution in proportion to how late
      // frames are, never creep back up, and if even the floor is too slow
      // settle on the frame just drawn rather than janking the page. Frames
      // during the grace period are ignored: those are slow because the page
      // is still loading, not because the machine is.
      if (now - startedAt > GRACE_MS && frameTime > 0.045) {
        slow += 1;
        if (scale > MIN_SCALE) {
          if (slow >= 2) {
            scale = Math.max(MIN_SCALE, scale * Math.max(0.5, 0.033 / frameTime));
            slow = 0;
          }
        } else if (frameTime > 0.2 && slow >= 3) {
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (raf || lost || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (reduced.matches) draw();
        else kick();
      }
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      if (reduced.matches) draw();
    });
    ro.observe(wrap);

    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    // The browser can drop a WebGL context at any time (GPU reset, too many
    // contexts). Hide the canvas so the poster shows, rather than a blank one.
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
      canvas.style.opacity = "0";
    };

    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    if (reduced.matches) draw();
    else {
      area.addEventListener("pointermove", onMove as EventListener);
      area.addEventListener("pointerleave", onLeave);
      kick();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      area.removeEventListener("pointermove", onMove as EventListener);
      area.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`select-none overflow-hidden ${className}`}>
      {/* The shader's first frame, preloaded so the hero is never blank. */}
      <Image
        src="/images/hero-liquid-poster.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
