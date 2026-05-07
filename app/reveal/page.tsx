"use client";
import './reveal.css';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProject, setCurrentStep } from "@/lib/storage";

export default function RevealPage() {
  const router = useRouter();
  const [name, setName]       = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const p = getProject();
    setName(
      p.slots.negocio_nombre ||
      p.slots.home_hero_titular ||
      "Tu web"
    );
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="reveal-root">
      <div className={`reveal-content${visible ? " reveal-in" : ""}`}>
        <div className="reveal-eyebrow">Tu web está lista</div>

        <div className="reveal-name">
          {name || <span className="reveal-placeholder">Lista</span>}
        </div>

        <div className="reveal-line" />

        <p className="reveal-body">
          Hemos generado el contenido de tu web a partir de vuestra conversación.
          Ahora puedes revisarlo, ajustarlo y publicarlo.
        </p>

        <button className="reveal-cta" onClick={() => { setCurrentStep("dominio"); router.push("/dominio"); }}>
          Ver y editar mi web
        </button>

        <button className="reveal-skip" onClick={() => { setCurrentStep("dominio"); router.push("/dashboard"); }}>
          Ir al panel principal
        </button>
      </div>
    </div>
  );
}
