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
uniform vec2 u_mouse;
uniform vec2 u_vel;
uniform float u_ratio;
uniform float u_imgRatio;
uniform float u_align;
uniform float u_time;

vec2 cover(vec2 uv) {
  float sx = min(1.0, u_ratio / u_imgRatio);
  float sy = min(1.0, u_imgRatio / u_ratio);

  float ox = (1.0 - sx) * u_align;
  float oy = (1.0 - sy) * 0.5;

  return vec2(
    ox + uv.x * sx,
    oy + uv.y * sy
  );
}

void main() {
  vec2 d = vUv - u_mouse;
  d.x *= u_ratio;

  float fall = exp(-dot(d, d) * 3.5) * 0.8 + 0.2;

  float speed = length(u_vel);
  vec2 disp = u_vel * fall;

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

function compile(gl, type, source) {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("WebGL shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !src) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let raf = 0;
    let texture = null;
    let buffer = null;
    let program = null;
    let vs = null;
    let fs = null;
    let observer = null;
    let resizeObserver = null;
    let img = null;

    setFallback(false);
    setReady(false);

    const cleanupGL = (gl) => {
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
    };

    // Static fallback for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    // Compile shaders.
    vs = compile(gl, gl.VERTEX_SHADER, VERT);
    fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);

    if (!vs || !fs) {
      cleanupGL(gl);
      setFallback(true);
      return;
    }

    // Create shader program.
    program = gl.createProgram();

    if (!program) {
      cleanupGL(gl);
      setFallback(true);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("WebGL program error:", gl.getProgramInfoLog(program));
      cleanupGL(gl);
      setFallback(true);
      return;
    }

    gl.useProgram(program);

    // Full-screen triangles.
    buffer = gl.createBuffer();

    if (!buffer) {
      cleanupGL(gl);
      setFallback(true);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_pos");

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations.
    const U = (name) => gl.getUniformLocation(program, name);

    const uMouse = U("u_mouse");
    const uVel = U("u_vel");
    const uRatio = U("u_ratio");
    const uImgRatio = U("u_imgRatio");
    const uAlign = U("u_align");
    const uTime = U("u_time");
    const uTexture = U("u_tex");

    let imgRatio = 1.5;
    let visible = true;

    const mouse = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };
    const vel = { x: 0, y: 0 };

    let last = null;

    const mq = window.matchMedia("(min-width: 768px)");

    // Responsive canvas sizing.
    const resize = () => {
      if (disposed) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));

      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    // Pointer tracking.
    const host =
      target || canvas.closest("section") || canvas.parentElement || window;

    const onMove = (e) => {
      if (e.pointerType === "touch" && !e.isPrimary) return;

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      mouseTarget.x = x;
      mouseTarget.y = y;

      if (last) {
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

    // Pause rendering when outside viewport.
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    observer.observe(canvas);

    // Resize handling.
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    resize();

    // Load image.
    img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (disposed) return;

      imgRatio = img.naturalWidth / img.naturalHeight;

      if (!imgRatio || !Number.isFinite(imgRatio)) {
        setFallback(true);
        return;
      }

      texture = gl.createTexture();

      if (!texture) {
        setFallback(true);
        return;
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.uniform1i(uTexture, 0);

      setReady(true);
      canvas.dataset.ready = "true";
    };

    img.onerror = () => {
      if (!disposed) setFallback(true);
    };

    img.src = src;

    // Animation loop.
    const start = performance.now();
    const MAX = 0.06;

    const frame = (now) => {
      if (disposed) return;

      raf = requestAnimationFrame(frame);

      if (!visible || !texture || !canvas.width || !canvas.height) {
        return;
      }

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

    raf = requestAnimationFrame(frame);

    // Handle WebGL context loss.
    const onContextLost = (e) => {
      e.preventDefault();

      if (!disposed) {
        setFallback(true);
        setReady(false);
      }
    };

    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      disposed = true;

      cancelAnimationFrame(raf);

      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);

      canvas.removeEventListener("webglcontextlost", onContextLost);

      observer?.disconnect();
      resizeObserver?.disconnect();

      if (img) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }

      cleanupGL(gl);
    };
  }, [src, alignDesktop, alignMobile, strength, target]);

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* Original image: visible during loading and as fallback */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
        className={`absolute inset-0 h-full w-full object-cover object-[75%_center] md:object-right transition-opacity duration-500 ${
          fallback || !ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* WebGL distortion canvas */}
      {!fallback && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
