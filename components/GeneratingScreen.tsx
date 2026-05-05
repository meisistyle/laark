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

interface GeneratingScreenProps {
  videoSrc?: string;
  onComplete?: () => void;
}

export default function GeneratingScreen({ videoSrc, onComplete }: GeneratingScreenProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "visible" | "out">("in");
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const SPACING  = 36;
    const R_MIN    = 1.4;
    const R_MAX    = 3.8;
    const OP_BASE  = 0.06;
    const OP_PEAK  = 0.72;
    const GLOW_R   = 200;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.004;
      const w = canvas.width;
      const h = canvas.height;

      // Organic Lissajous path — irrational frequency ratios avoid repetition
      const ax = w * (0.5 + 0.42 * Math.sin(t * 0.90 + 1.1) * Math.cos(t * 0.27));
      const ay = h * (0.5 + 0.38 * Math.sin(t * 0.61)        * Math.cos(t * 0.19));

      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING + SPACING / 2;
          const y = row * SPACING + SPACING / 2;

          const dx = x - ax;
          const dy = y - ay;
          const influence = Math.exp(-(dx * dx + dy * dy) / (GLOW_R * GLOW_R));

          const opacity = OP_BASE + (OP_PEAK - OP_BASE) * influence;
          const dotR    = R_MIN  + (R_MAX  - R_MIN)  * influence;

          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,228,205,${opacity.toFixed(3)})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const phraseOpacity = fadeState === "in" ? 0 : fadeState === "visible" ? 1 : 0;
  const isLastPhrase  = phraseIndex === PHRASES.length - 1;

  return (
    <div className="generating-screen">
      {videoSrc && (
        <video className="generating-video" src={videoSrc} autoPlay muted playsInline />
      )}

      <div className="generating-overlay" />

      <canvas ref={canvasRef} className="generating-canvas" />

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
