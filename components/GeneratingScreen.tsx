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

function drawDotGrid(canvas: HTMLCanvasElement, time: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const gap = 22;
  const maxR = 2.4;
  const minR = 0.3;

  const cols = Math.ceil(w / gap) + 1;
  const rows = Math.ceil(h / gap) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * gap;
      const y = row * gap;

      // Three overlapping slow waves give organic mutation
      const t = time * 0.00042;
      const wave1 = Math.sin(col * 0.38 + t * 1.1);
      const wave2 = Math.sin(row * 0.31 + t * 0.8);
      const wave3 = Math.sin((col + row) * 0.22 + t * 1.4);
      const intensity = (wave1 + wave2 + wave3) / 3; // -1 to 1

      const norm = (intensity + 1) / 2; // 0 to 1
      const r = minR + (maxR - minR) * norm;
      const alpha = 0.08 + 0.28 * norm;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 228, 208, ${alpha})`;
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
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "visible" | "out">("in");

  // Dot grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      drawDotGrid(canvas, ts - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
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
  const isLastPhrase = phraseIndex === PHRASES.length - 1;

  return (
    <div className="generating-screen">
      {videoSrc && (
        <video
          className="generating-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
        />
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
            style={{
              opacity: phraseOpacity,
              transition: `opacity ${FADE_DURATION}ms ease`,
            }}
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
