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
const FADE_DURATION = 650;

// Grid spacing and dot sizing
const GAP = 26;
const MIN_R = 0.3;
const MAX_R = 4.2;
const SIGMA = 200; // influence radius of each attractor

interface Attractor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
}

function pnoise(x: number): number {
  const s = Math.sin(x * 127.1 + 311.7) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

function initAttractors(w: number, h: number): Attractor[] {
  return [
    { x: w * 0.25, y: h * 0.35, vx: 0.25, vy: 0.18, seed: 0 },
    { x: w * 0.72, y: h * 0.55, vx: -0.2, vy: 0.28, seed: 17.3 },
    { x: w * 0.5,  y: h * 0.75, vx: 0.18, vy: -0.22, seed: 34.7 },
  ];
}

function stepAttractors(attractors: Attractor[], w: number, h: number, time: number) {
  for (const a of attractors) {
    const t = time * 0.00035;
    const ax = pnoise(a.x * 0.004 + a.seed + t) * 0.055;
    const ay = pnoise(a.y * 0.004 + a.seed + 9.1 + t) * 0.055;
    a.vx = a.vx * 0.97 + ax;
    a.vy = a.vy * 0.97 + ay;
    // cap speed
    const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
    if (spd > 0.65) { a.vx *= 0.65 / spd; a.vy *= 0.65 / spd; }
    a.x += a.vx;
    a.y += a.vy;
    // soft boundary repulsion
    const margin = 100;
    if (a.x < margin)     a.vx += 0.04;
    if (a.x > w - margin) a.vx -= 0.04;
    if (a.y < margin)     a.vy += 0.04;
    if (a.y > h - margin) a.vy -= 0.04;
  }
}

function drawFrame(canvas: HTMLCanvasElement, attractors: Attractor[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cols = Math.ceil(w / GAP) + 1;
  const rows = Math.ceil(h / GAP) + 1;
  const sigSq2 = 2 * SIGMA * SIGMA;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * GAP;
      const y = row * GAP;

      let influence = 0;
      for (const a of attractors) {
        const dx = x - a.x;
        const dy = y - a.y;
        influence += Math.exp(-(dx * dx + dy * dy) / sigSq2);
      }
      // clamp but allow overlap to stack naturally up to ~1.6
      const norm = Math.min(influence, 1);

      const r = MIN_R + (MAX_R - MIN_R) * norm;
      const alpha = 0.055 + 0.38 * norm;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 225, 200, ${alpha})`;
      ctx.fill();
    }
  }
}

interface GeneratingScreenProps {
  videoSrc?: string;
  onComplete?: () => void;
}

export default function GeneratingScreen({ videoSrc, onComplete }: GeneratingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);
  const attrRef  = useRef<Attractor[]>([]);
  const startRef = useRef<number>(0);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "visible" | "out">("in");

  // Attractor mesh animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      attrRef.current = initAttractors(canvas.width, canvas.height);
    };
    init();
    window.addEventListener("resize", init);

    const loop = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      stepAttractors(attrRef.current, canvas.width, canvas.height, elapsed);
      drawFrame(canvas, attrRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
    };
  }, []);

  // Phrase sequencer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const advance = (index: number) => {
      setFadeState("in");
      setPhraseIndex(index);
      timeout = setTimeout(() => {
        setFadeState("visible");
        timeout = setTimeout(() => {
          setFadeState("out");
          timeout = setTimeout(() => {
            const next = index + 1;
            if (next < PHRASES.length) advance(next);
            else onComplete?.();
          }, FADE_DURATION);
        }, PHRASE_DURATION - FADE_DURATION * 2);
      }, FADE_DURATION);
    };
    advance(0);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  const phraseOpacity = fadeState === "in" ? 0 : fadeState === "visible" ? 1 : 0;
  const isLastPhrase  = phraseIndex === PHRASES.length - 1;

  return (
    <div className="generating-screen">
      {videoSrc && (
        <video className="generating-video" src={videoSrc} autoPlay muted playsInline />
      )}

      <canvas ref={canvasRef} className="generating-dot-canvas" />

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

        <div className="generating-dots">
          {PHRASES.map((_, i) => (
            <span
              key={i}
              className="generating-dot"
              style={{
                opacity: i <= phraseIndex ? 1 : 0.25,
                transform: i === phraseIndex ? "scale(1.5)" : "scale(1)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
