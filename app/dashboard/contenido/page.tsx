"use client";

import { useState, useEffect } from "react";
import { getProject } from "@/lib/storage";
import { WebSlots, SkinName } from "@/lib/slots";
import ChatPanel from "@/components/ChatPanel";
import SkinPreview from "@/components/SkinPreview";
import { Icon } from "../_shared";

export default function ContenidoPage() {
  const [mobile, setMobile]     = useState(false);
  const [slots, setSlots]       = useState<WebSlots | null>(null);
  const [skin, setSkin]         = useState<SkinName>("Luminous");
  const [businessName, setName] = useState("Tu proyecto");

  useEffect(() => {
    const p = getProject();
    setSlots(p.slots);
    setSkin(p.skin);
    setName(p.slots.negocio_nombre || "Tu proyecto");
  }, []);

  function handleSlotsUpdate(partial: Partial<WebSlots>) {
    setSlots(prev => prev ? { ...prev, ...partial } : prev);
  }

  return (
    <section className="dashboard-workspace dashboard-workspace-chat">
      <div className="dashboard-chat-shell">
        <div className="dashboard-flow-note">
          <span>Paso 1</span>
          <strong>Contenido</strong>
          <small>Empieza por la conversación inicial para crear la estructura y los textos.</small>
        </div>
        <ChatPanel onSlotsUpdate={handleSlotsUpdate} />
      </div>

      <div className="dashboard-preview-shell">
        <div className="dashboard-preview-bar">
          <div>
            <p className="dashboard-eyebrow">Preview en tiempo real</p>
            <h1>{businessName}</h1>
          </div>
          <div className="dashboard-preview-actions">
            <span className="dashboard-live-status"><span /> En vivo</span>
            <div className="dashboard-device-toggle" aria-label="Formato de preview">
              <button className={!mobile ? "is-active" : ""} onClick={() => setMobile(false)} type="button">
                <Icon name="monitor" /> Escritorio
              </button>
              <button className={mobile ? "is-active" : ""} onClick={() => setMobile(true)} type="button">
                <Icon name="phone" /> Móvil
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-preview-canvas">
          {slots && (
            <div className={mobile ? "dashboard-preview-mobile" : "dashboard-preview-desktop"}>
              <SkinPreview slots={slots} skin={skin} mobile={mobile} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
