"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Estoy leyendo todo lo que me has contado...",
  "Encontrando las palabras que te definen...",
  "Construyendo la estructura de tu web...",
  "Eligiendo cómo contar tu historia...",
  "Casi lista. Va a gustarte.",
];

const PHRASE_DURATION = 3000;
const FADE_DURATION   = 650;

// Each dot breathes at a slightly different pace — avoids mechanical feel
const DOTS = [
  { dur: 2.10, del: 0.00 },
  { dur: 1.85, del: 0.40 },
  { dur: 2.35, del: 0.22 },
  { dur: 2.05, del: 0.68 },
  { dur: 1.95, del: 0.50 },
];

interface GeneratingScreenProps {
  videoSrc?: string;
  onComplete?: () => void;
}

export default function GeneratingScreen({ videoSrc, onComplete }: GeneratingScreenProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState,   setFadeState]   = useState<"in" | "visible" | "out">("in");

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
        <video className="generating-video" src={videoSrc} autoPlay muted playsInline loop />
      )}

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

        <div className="thinking-dots">
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="thinking-dot"
              style={{ "--dot-dur": `${d.dur}s`, "--dot-del": `${d.del}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
