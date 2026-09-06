"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isAccent: boolean;
}

const NAVY = "13, 22, 63";
const RED = "223, 8, 26";
const PARTICLE_COUNT_DIVISOR = 14000; // lower = more particles
const LINK_DISTANCE = 140;
const ACCENT_RATIO = 0.12;

export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initParticles() {
      const count = Math.min(90, Math.floor((width * height) / PARTICLE_COUNT_DIVISOR));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        isAccent: Math.random() < ACCENT_RATIO,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      // update + draw particles
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.isAccent ? 2.2 : 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.isAccent ? RED : NAVY}, 0.55)`;
        ctx!.fill();
      }

      // draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.22;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${NAVY}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    }

    resize();
    step();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: "#F4F3ED" }}>
      <style>{`
        @keyframes bgOrbFloat1 {
          0%, 100% { transform: translate(-5%, -5%) scale(1); }
          33% { transform: translate(8%, 12%) scale(1.15); }
          66% { transform: translate(-8%, 6%) scale(0.9); }
        }
        @keyframes bgOrbFloat2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-12%, 10%) scale(1.2); }
        }
        @keyframes bgOrbFloat3 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          40% { transform: translate(10%, -8%) scale(1.1); }
          75% { transform: translate(-6%, -14%) scale(0.95); }
        }
        @keyframes bgOrbFloat4 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(6%, 14%) scale(1.25); }
        }
        .bg-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-orb { animation: none !important; }
        }
      `}</style>

      <div
        className="bg-orb"
        style={{
          top: "5%",
          left: "-8%",
          width: "42vw",
          height: "42vw",
          maxWidth: 640,
          maxHeight: 640,
          background: "radial-gradient(circle, rgba(13,22,63,0.16) 0%, rgba(13,22,63,0) 70%)",
          animation: "bgOrbFloat1 34s ease-in-out infinite",
        }}
      />
      <div
        className="bg-orb"
        style={{
          top: "28%",
          right: "-10%",
          width: "38vw",
          height: "38vw",
          maxWidth: 560,
          maxHeight: 560,
          background: "radial-gradient(circle, rgba(223,8,26,0.13) 0%, rgba(223,8,26,0) 70%)",
          animation: "bgOrbFloat2 28s ease-in-out infinite",
        }}
      />
      <div
        className="bg-orb"
        style={{
          top: "58%",
          left: "5%",
          width: "34vw",
          height: "34vw",
          maxWidth: 500,
          maxHeight: 500,
          background: "radial-gradient(circle, rgba(223,8,26,0.1) 0%, rgba(223,8,26,0) 70%)",
          animation: "bgOrbFloat3 40s ease-in-out infinite",
        }}
      />
      <div
        className="bg-orb"
        style={{
          bottom: "-6%",
          right: "8%",
          width: "40vw",
          height: "40vw",
          maxWidth: 600,
          maxHeight: 600,
          background: "radial-gradient(circle, rgba(13,22,63,0.14) 0%, rgba(13,22,63,0) 70%)",
          animation: "bgOrbFloat4 32s ease-in-out infinite",
        }}
      />

      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
    </div>
  );
}
