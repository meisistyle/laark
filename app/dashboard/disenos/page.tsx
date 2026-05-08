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
    label: "Skin1",
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
  const [slots, setSlots]     = useState<WebSlots | null>(null);
  const [skin, setSkin]       = useState<SkinName>("Skin1");
  const [verSkin, setVerSkin] = useState<SkinName | null>(null);

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

        {/* ── Left: cards ── */}
        <div className="dis-left">
          <h1 className="dis-headline">
            Elige tu diseño.
            Cambia cuando quieras.
          </h1>

          <div className="dis-cards">
            {SKINS.map(option => (
              <article
                key={option.name}
                className={`dis-card${skin === option.name ? " is-active" : ""}`}
              >
                <button type="button" className="dis-card-btn" onClick={() => handleSkinChange(option.name)}>
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

                {/* ── VER / PREVIEW ── */}
                <div className="dis-card-actions">
                  <button
                    className="dis-card-action"
                    type="button"
                    onClick={() => setVerSkin(option.name)}
                  >
                    Ver
                  </button>
                  <span className="dis-card-action-sep">·</span>
                  <a
                    className="dis-card-action"
                    href="/web-preview"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => saveSkin(option.name)}
                  >
                    En vivo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Right: live preview ── */}
        <div className="dis-preview-panel">
          <div className="dis-preview-label">
            <span className="dis-preview-label-text">Diseño activo</span>
            <span className="dis-preview-label-name">
              {SKINS.find(s => s.name === skin)?.label ?? skin}
            </span>
          </div>
          <div className="dis-preview-frame">
            {slots && <SkinPreview slots={slots} skin={skin} />}
          </div>
        </div>
      </div>

      {/* ── Modal VER (plantilla entera scrollable) ── */}
      {verSkin && slots && (
        <div className="dis-modal" role="dialog" aria-modal="true">
          <button className="dis-modal-backdrop" onClick={() => setVerSkin(null)} aria-label="Cerrar" />
          <div className="dis-modal-inner">
            <button className="dis-modal-close" onClick={() => setVerSkin(null)}>✕</button>
            <div className="dis-modal-scroll">
              <SkinPreview slots={slots} skin={verSkin} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
