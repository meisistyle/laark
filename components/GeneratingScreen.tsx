"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Estoy leyendo todo lo que me has contado...",
  "Encontrando las palabras que te definen...",
  "Construyendo la estructura de tu web...",
  "Eligiendo cómo contar tu historia...",
  "Casi lista. Va a gustarte.",
];

// 15s video / 5 phrases = 3s each
const PHRASE_DURATION = 3000;
const FADE_DURATION = 650;

interface GeneratingScreenProps {
  videoSrc?: string;
  onComplete?: () => void;
}

export default function GeneratingScreen({ videoSrc, onComplete }: GeneratingScreenProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "visible" | "out">("in");

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
            if (next < PHRASES.length) {
              advance(next);
            } else {
              onComplete?.();
            }
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
