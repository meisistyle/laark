"use client";
import './disenos.css';

import { useState, useEffect } from "react";
import { getProject, setSkin as saveSkin } from "@/lib/storage";
import { WebSlots, SkinName } from "@/lib/slots";
import SkinPreview from "@/components/SkinPreview";

const SKINS: {
  name: SkinName;
  label: string;
  style: string;
  img: string;
}[] = [
  {
    name:  "Skin1",
    label: "Luminoso",
    style: "Magazine",
    img:   "/assets/DASHBOARD/RENACIMIENTO76.png",
  },
  {
    name:  "Fresco",
    label: "Fresco",
    style: "Sofisticado",
    img:   "/assets/skin-fresco.png",
  },
  {
    name:  "Calma",
    label: "Calma",
    style: "Natural",
    img:   "/assets/skin-calma.png",
  },
];

export default function DisenosPage() {
  const [slots, setSlots]           = useState<WebSlots | null>(null);
  const [skin, setSkin]             = useState<SkinName>("Skin1");
  const [showPreview, setShowPreview] = useState(false);

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
    <section className="dis-screen" aria-label="Diseños">
      <div className="dis-layout">
        {/* ── Left: headline ── */}
        <div className="dis-left">
          <h1 className="dis-headline">
            Elige tu diseño.
            Cambia cuando quieras.
          </h1>
          <p className="dis-desc">
            Tienes varios diseños para elegir. Tu contenido encaja en cualquiera
            sin que tengas que tocar nada. Como cambiar de vestido.
          </p>

          {/* Selected skin info */}
          <div className="dis-active-info">
            <span className="dis-active-label">Diseño activo</span>
            <span className="dis-active-name">
              {SKINS.find(s => s.name === skin)?.label ?? skin}
            </span>
          </div>

          {showPreview && slots && (
            <div className="dis-preview-wrap">
              <SkinPreview slots={slots} skin={skin} />
            </div>
          )}

          <button
            className="dis-preview-toggle"
            type="button"
            onClick={() => setShowPreview((v: boolean) => !v)}
          >
            {showPreview ? "Ocultar preview" : "Ver preview"}
          </button>
        </div>

        {/* ── Right: skin cards ── */}
        <div className="dis-cards">
          {SKINS.map(option => (
            <article
              key={option.name}
              className={`dis-card${skin === option.name ? " is-active" : ""}`}
            >
              <button type="button" onClick={() => handleSkinChange(option.name)}>
                <div className="dis-card-img-wrap">
                  <img src={option.img} alt={option.label} />
                  {skin === option.name && (
                    <span className="dis-card-selected-badge">Activo</span>
                  )}
                </div>
                <div className="dis-card-foot">
                  <span className="dis-card-name">{option.label}</span>
                  <span className="dis-card-style">{option.style}</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
