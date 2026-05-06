"use client";

import { useState, useEffect } from "react";
import { getProject, setSkin as saveSkin } from "@/lib/storage";
import { WebSlots, SkinName } from "@/lib/slots";
import SkinPreview from "@/components/SkinPreview";
import { SectionHeader } from "../_shared";

const SKINS: { name: SkinName; desc: string; bg: string; color: string }[] = [
  { name: "Luminous", desc: "Cálido, editorial, orgánico",  bg: "linear-gradient(160deg,#F0EBE3,#D4C5B5)", color: "#4A3728" },
  { name: "Fresco",   desc: "Limpio, fresco, profesional",  bg: "linear-gradient(160deg,#E8EDF0,#B5C9D4)", color: "#2B3E4A" },
  { name: "Calma",    desc: "Neutro, elegante, atemporal",  bg: "linear-gradient(160deg,#F0EDE8,#C9C4B4)", color: "#3A3528" },
];

export default function DisenosPage() {
  const [slots, setSlots] = useState<WebSlots | null>(null);
  const [skin, setSkin]   = useState<SkinName>("Luminous");

  useEffect(() => {
    const p = getProject();
    setSlots(p.slots);
    setSkin(p.skin);
  }, []);

  function handleSkinChange(next: SkinName) {
    setSkin(next);
    saveSkin(next);
  }

  return (
    <section className="dashboard-section">
      <SectionHeader title="Diseños" eyebrow="Skins" />
      <div className="dashboard-skin-grid">
        {SKINS.map(option => (
          <article key={option.name} className={`dashboard-skin-card${skin === option.name ? " is-active" : ""}`}>
            <button type="button" onClick={() => handleSkinChange(option.name)}>
              <span className="dashboard-skin-preview" style={{ background: option.bg, color: option.color }}>
                {option.name}
              </span>
              <span className="dashboard-skin-copy">
                <strong>{option.name}</strong>
                <small>{option.desc}</small>
              </span>
              {skin === option.name && <span className="dashboard-status-pill">Activo</span>}
            </button>
          </article>
        ))}
      </div>
      <article className="dashboard-card dashboard-preview-card">
        {slots && <SkinPreview slots={slots} skin={skin} />}
      </article>
    </section>
  );
}
