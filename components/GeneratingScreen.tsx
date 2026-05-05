"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "Estoy leyendo todo lo que me has contado...",
  "Encontrando las palabras que te definen...",
  "Construyendo la estructura de tu web...",
  "Eligiendo cómo contar tu historia...",
  "Casi lista. Va a gustarte.",
];

const PHRASE_DURATION = 3000;
const FADE_DURATION   = 650;

// Particle system
const N_CLUSTERS    = 13;
const MOUSE_RADIUS  = 180;
const MOUSE_FORCE   = 220;
const SPRING_K      = 3.2;
const DAMPING       = 0.87;

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  r: number;
  phase: number;
  dur: number;
  baseAlpha: number;
}

function gauss(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function buildParticles(w: number, h: number): Particle[] {
  const list: Particle[] = [];
  for (let c = 0; c < N_CLUSTERS; c++) {
    const cx     = w * (0.08 + Math.random() * 0.84);
    const cy     = h * (0.08 + Math.random() * 0.84);
    const spread = 55 + Math.random() * 110;
    const count  = 18 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const ox = cx + gauss() * spread;
      const oy = cy + gauss() * spread;
      list.push({
        x: ox, y: oy, ox, oy,
        vx: 0, vy: 0,
        r: 1.4 + Math.random() * 2.8,
        phase:     Math.random() * Math.PI * 2,
        dur:       (1900 + Math.random() * 2400),   // ms
        baseAlpha: 0.10 + Math.random() * 0.50,
      });
    }
  }
  return list;
}

interface Props {
  videoSrc?: string;
  onComplete?: () => void;
}

export default function GeneratingScreen({ videoSrc, onComplete }: Props) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState,   setFadeState]   = useState<"in" | "visible" | "out">("in");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(0);

  // Phrase sequencer
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const advance = (i: number) => {
      setFadeState("in");
      setPhraseIndex(i);
      t = setTimeout(() => {
        setFadeState("visible");
        t = setTimeout(() => {
          setFadeState("out");
          t = setTimeout(() => {
            const next = i + 1;
            if (next < PHRASES.length) advance(next);
            else onComplete?.();
          }, FADE_DURATION);
        }, PHRASE_DURATION - FADE_DURATION * 2);
      }, FADE_DURATION);
    };
    advance(0);
    return () => clearTimeout(t);
  }, [onComplete]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles = buildParticles(canvas.width, canvas.height);

    const onResize = () => {
      resize();
      particles = buildParticles(canvas.width, canvas.height);
    };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const start = performance.now();
    let prev    = start;

    const draw = (now: number) => {
      const t  = now - start;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles) {
        // Mouse repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.5) {
          const strength = ((1 - dist / MOUSE_RADIUS) ** 2) * MOUSE_FORCE;
          p.vx += (dx / dist) * strength * dt;
          p.vy += (dy / dist) * strength * dt;
        }

        // Spring toward origin
        p.vx += (p.ox - p.x) * SPRING_K * dt;
        p.vy += (p.oy - p.y) * SPRING_K * dt;

        // Dampen & integrate
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        // Breathing pulse
        const pulse = (Math.sin((t / p.dur) * Math.PI * 2 + p.phase) + 1) * 0.5;
        const alpha = p.baseAlpha * (0.06 + 0.94 * pulse);
        const r     = p.r * (0.30 + 0.70 * pulse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,232,215,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const phraseOpacity = fadeState === "in" ? 0 : fadeState === "visible" ? 1 : 0;
  const isLastPhrase  = phraseIndex === PHRASES.length - 1;

  return (
    <div className="generating-screen">
      {videoSrc && (
        <video className="generating-video" src={videoSrc} autoPlay muted playsInline loop />
      )}

      <canvas ref={canvasRef} className="generating-canvas" />

      <div className="generating-overlay" />

      <div className="generating-content">
        <div className="generating-logo">
          <img src="/assets/LAARK logo vert.png" alt="LAARK" />
        </div>

        <div className="generating-phrase-wrap">
          <p
            className={`generating-phrase${isLastPhrase ? " generating-phrase--final" : ""}`}
            style={{ opacity: phraseOpacity, transition: `opacity ${FADE_DURATION}ms ease` }}
          >
            {PHRASES[phraseIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
