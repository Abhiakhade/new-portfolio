import { useEffect, useRef, useState } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D u_tex;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform float u_ratio;
uniform float u_imgRatio;
uniform float u_align;
uniform float u_time;

// "object-fit: cover" with a horizontal anchor
vec2 cover(vec2 uv) {
  float sx = min(1.0, u_ratio / u_imgRatio);
  float sy = min(1.0, u_imgRatio / u_ratio);
  float ox = (1.0 - sx) * u_align;
  float oy = (1.0 - sy) * 0.5;
  return vec2(ox + uv.x * sx, oy + uv.y * sy);
}

void main() {
  vec2 d = vUv - u_mouse;
  d.x *= u_ratio;
  // strongest around the cursor, still visible across the whole image
  float fall = exp(-dot(d, d) * 3.5) * 0.8 + 0.2;

  float speed = length(u_vel);
  vec2 disp = u_vel * fall;

  // soft liquid wobble that scales with speed
  vec2 wob = vec2(
    sin(vUv.y * 22.0 + u_time * 4.0),
    cos(vUv.x * 18.0 + u_time * 3.0)
  ) * speed * 0.35 * fall;

  vec2 base = vUv + wob;
  float r = texture2D(u_tex, cover(base + disp)).r;
  float g = texture2D(u_tex, cover(base)).g;
  float b = texture2D(u_tex, cover(base - disp)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function DistortedImage({
  src,
  className = "absolute inset-0 h-full w-full",
  alignDesktop = 1,
  alignMobile = 0.75,
  strength = 1,
  target,
}) {
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // static picture for people who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFallback(true);
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // full-screen triangle pair
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(program, n);
    const uMouse = U("u_mouse");
    const uVel = U("u_vel");
    const uRatio = U("u_ratio");
    const uImgRatio = U("u_imgRatio");
    const uAlign = U("u_align");
    const uTime = U("u_time");

    let disposed = false;
    let raf = 0;
    let visible = true;
    let imgRatio = 1.5;
    let texture = null;

    // state
    const mouse = { x: 0.5, y: 0.5 }; // smoothed, in uv (y up)
    const mouseTarget = { x: 0.5, y: 0.5 };
    const vel = { x: 0, y: 0 };
    let last = null;

    const mq = window.matchMedia("(min-width: 768px)");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    // listen on the whole section so the effect works even with text/logos on top
    const host =
      target || canvas.closest("section") || canvas.parentElement || window;

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      mouseTarget.x = x;
      mouseTarget.y = y;
      if (last) {
        // velocity in uv units, pushed toward the latest movement
        const dx = (x - last.x) * strength * 2.2;
        const dy = (y - last.y) * strength * 2.2;
        vel.x += (dx - vel.x) * 0.35;
        vel.y += (dy - vel.y) * 0.35;
      }
      last = { x, y };
    };
    const onLeave = () => {
      last = null;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const start = performance.now();
    const MAX = 0.06;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !texture) return;

      // ease the cursor position and let the velocity fade out
      mouse.x += (mouseTarget.x - mouse.x) * 0.12;
      mouse.y += (mouseTarget.y - mouse.y) * 0.12;
      vel.x *= 0.92;
      vel.y *= 0.92;

      const len = Math.hypot(vel.x, vel.y);
      if (len > MAX) {
        vel.x = (vel.x / len) * MAX;
        vel.y = (vel.y / len) * MAX;
      }

      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uVel, vel.x, vel.y);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
      gl.uniform1f(uImgRatio, imgRatio);
      gl.uniform1f(uAlign, mq.matches ? alignDesktop : alignMobile);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (disposed) return;
      imgRatio = img.naturalWidth / img.naturalHeight;
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(U("u_tex"), 0);
      canvas.dataset.ready = "true";
    };
    img.onerror = () => !disposed && setFallback(true);
    img.src = src;

    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      ro.disconnect();
      if (texture) gl.deleteTexture(texture);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src, alignDesktop, alignMobile, strength, target]);

  if (fallback) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`${className} object-cover object-[75%_center] md:object-right`}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
