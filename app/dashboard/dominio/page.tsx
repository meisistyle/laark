"use client";

import { useEffect, useState } from "react";
import { getProject } from "@/lib/storage";
import { Icon, SectionHeader } from "../_shared";

export default function DominioPag() {
  const [subdomain, setSubdomain] = useState("tunegocio.laark.io");

  useEffect(() => {
    const p    = getProject();
    const name = p.slots.negocio_nombre || "tunegocio";
    setSubdomain(name.toLowerCase().replace(/\s/g, "") + ".laark.io");
  }, []);

  return (
    <section className="dashboard-section dashboard-section-narrow">
      <SectionHeader title="Dominio" eyebrow="Publicación" />

      <article className="dashboard-card dashboard-domain-card">
        <span className="dashboard-live-status"><span /> Online</span>
        <h2>{subdomain}</h2>
        <p>Tu web nace en un subdominio LAARK. Cuando quieras, puedes conectar tu propio dominio.</p>
        <button className="dashboard-button dashboard-button-outline" type="button">
          <Icon name="external" /> Ver web
        </button>
      </article>

      <article className="dashboard-card">
        <p className="dashboard-eyebrow">Dominio propio</p>
        <h2>Conectar un .com</h2>
        <p className="dashboard-muted-text">
          Cuando tengas tu dominio, lo apuntamos desde aquí. El tutorial está pensado para hacerlo en unos 10 minutos.
        </p>
        <div className="dashboard-form-row">
          <input type="text" placeholder="tunegocio.com" />
          <button className="dashboard-button" type="button">Conectar</button>
        </div>
      </article>
    </section>
  );
}
