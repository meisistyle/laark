"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProject, setSkin } from "@/lib/storage";
import { SkinName } from "@/lib/slots";

const SKINS: { id: SkinName; label: string; badge: string; desc: string }[] = [
  { id: "Skin1", label: "Luminoso", badge: "L", desc: "Limpio, claro, con mucho espacio. Para quienes trabajan con luz y calma." },
  { id: "Fresco",   label: "Fresco",   badge: "F", desc: "Tonos neutros, tipografía elegante. Para marcas sofisticadas y atemporales." },
  { id: "Calma",    label: "Calma",    badge: "C", desc: "Más color, más presencia. Para quienes no pasan desapercibidas." },
];

export default function OnboardingDiseno() {
  const [skin, setSkinState] = useState<SkinName>("Skin1");

  useEffect(() => {
    const p = getProject();
    setSkinState(p.skin);
  }, []);

  function handleSelect(id: SkinName) {
    setSkinState(id);
    setSkin(id); // persist immediately so /listo reads it
  }

  return (
    <div className="ob-page">
      <div className="ob-photo ob-photo--3">
        <div className="ob-photo-logo">
          <img src="/assets/LAARK logo vert.png" alt="LAARK" />
        </div>
      </div>

      <div className="ob-content">
        <p className="ob-eyebrow">Tu diseño</p>
        <h1 className="ob-title">Elige cómo<br />quieres verte.</h1>
        <p className="ob-desc">
          Cada diseño está pensado para un tipo de profesional.
          Puedes cambiarlo después — elige el que más se parezca a ti ahora.
        </p>
        <div className="ob-skins">
          {SKINS.map(s => (
            <div
              key={s.id}
              className={`ob-skin-option${skin === s.id ? " ob-skin-option--selected" : ""}`}
              onClick={() => handleSelect(s.id)}
            >
              <div className="ob-skin-badge">{s.badge}</div>
              <div>
                <div className="ob-skin-label">{s.label}</div>
                <div className="ob-skin-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ob-btn-row">
          <Link className="ob-btn-primary" href="/onboarding/listo">Continuar</Link>
          <Link className="ob-btn-secondary" href="/onboarding/info">Atrás</Link>
        </div>
      </div>
    </div>
  );
}
