import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getCleanMediaUrl } from '../utils/media.js';

/**
 * Drop-in animated background for a page's Section 1 (hero).
 *
 * - Dark theme: a live WebGL "aurora" shader (violet/teal fluid motion) that
 *   behaves like an ambient background video without needing a video file.
 * - Light theme: soft, slowly drifting gradient blobs + a subtle grid, so the
 *   hero still feels alive without turning muddy on a light background.
 * - Real video: if you have an actual .mp4 (e.g. drone footage, product reel),
 *   drop it in /public/videos and pass `videoSrc="/videos/your-file.mp4"`.
 *   It will be used for BOTH themes instead of the generated animation,
 *   dimmed/tinted appropriately.
 * - Image fallback: pass `imageSrc="/images/your-file.jpg"` to use a static
 *   background image (used automatically on data-saver / very low motion).
 */
export default function SectionBackground({
  videoSrc,
  imageSrc,
  className = '',
  videoFit = 'cover', // 'cover' | 'contain' | 'fill'
  videoPosition = 'center', // 'center' | 'top' | 'bottom'
}) {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoSrc) return; // real video takes over, skip shader
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;
    const fs = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform float u_baseDark;
      void main() {
        vec2 uv = v_uv;
        float n = sin(uv.x * 9.0 + u_time * 0.6) * cos(uv.y * 8.0 - u_time * 0.35);
        n += sin(uv.y * 5.0 + u_time * 0.5) * cos(uv.x * 7.0 + u_time * 0.2);
        vec3 color = vec3(u_baseDark);
        float maskA = smoothstep(0.35, 0.85, n * 0.5 + 0.5);
        float maskB = smoothstep(0.55, 1.0, n * 0.4 + 0.4);
        color = mix(color, u_colorA, maskA * 0.35);
        color = mix(color, u_colorB, maskB * 0.14);
        float d = length(uv - 0.5);
        color *= smoothstep(1.15, 0.4, d);
        gl_FragColor = vec4(color, 1.0);
      }`;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uColorA = gl.getUniformLocation(program, 'u_colorA');
    const uColorB = gl.getUniformLocation(program, 'u_colorB');
    const uBase = gl.getUniformLocation(program, 'u_baseDark');

    let raf;
    function resize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function render(t) {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      if (theme === 'dark') {
        gl.uniform3f(uColorA, 0.486, 0.227, 0.929); // #7C3AED
        gl.uniform3f(uColorB, 0.235, 0.867, 0.780); // #3CDDC7
        gl.uniform1f(uBase, 0.02);
      } else {
        gl.uniform3f(uColorA, 0.71, 0.6, 0.96);
        gl.uniform3f(uColorB, 0.6, 0.85, 0.82);
        gl.uniform1f(uBase, 0.99);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme, videoSrc]);

  const finalVid = getCleanMediaUrl(videoSrc);
  const finalImg = getCleanMediaUrl(imageSrc);

  if (finalVid) {
    const fitClass = videoFit === 'contain' ? 'object-contain' : videoFit === 'fill' ? 'object-fill' : 'object-cover';
    const posClass = videoPosition === 'top' ? 'object-top' : videoPosition === 'bottom' ? 'object-bottom' : 'object-center';

    return (
      <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full bg-black ${className}`}>
        <video
          className={`absolute inset-0 w-full h-full ${fitClass} ${posClass}`}
          src={finalVid}
          poster={finalImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    );
  }



  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      {imageSrc && (
        <img src={imageSrc} alt="" className="w-full h-full object-cover opacity-30 dark:opacity-20" />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 dark:opacity-50" />
      {/* Light-theme drifting accent blobs, layered above the shader for extra warmth */}
      {theme === 'light' && (
        <>
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary-strong/10 blur-3xl animate-drift" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-teal/10 blur-3xl animate-drift [animation-delay:-6s]" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/10 to-bg/60" />
    </div>
  );
}
