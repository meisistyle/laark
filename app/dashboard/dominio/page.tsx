"use client";
import './dominio-dashboard.css';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProject } from "@/lib/storage";
import { Icon, SectionHeader } from "../_shared";

export default function DominioPag() {
  const [domain, setDomain]           = useState<string | null>(null);
  const [domainStatus, setDomainStatus] = useState<"pending" | "confirmed">("pending");
  const [subdomain, setSubdomain]     = useState("tunegocio.laark.io");

  useEffect(() => {
    const p    = getProject();
    const name = p.slots.negocio_nombre || "tunegocio";
    setSubdomain(name.toLowerCase().replace(/\s/g, "") + ".laark.io");
    setDomain(p.domain);
    setDomainStatus(p.domain_status);
  }, []);

  return (
    <section className="dashboard-section dashboard-section-narrow">
      <SectionHeader title="Dominio" eyebrow="Publicación" />

      <article className="dashboard-card dashboard-domain-card">
        <span className="dashboard-live-status"><span /> Online</span>
        <h2>{subdomain}</h2>
        <p>Tu web está publicada en un subdominio LAARK. Cuando quieras, puedes conectar tu propio dominio.</p>
        <button className="dashboard-button dashboard-button-outline" type="button">
          <Icon name="external" /> Ver web
        </button>
      </article>

      {domainStatus === "confirmed" && domain ? (
        <article className="dashboard-card">
          <p className="dashboard-eyebrow">Dominio propio</p>
          <h2>{domain}</h2>
          <p className="dashboard-muted-text">
            Tu dominio está confirmado. En cuanto lo apuntes a nuestros servidores, quedará activo.
          </p>
          <div className="dashboard-form-row">
            <input type="text" value={domain} readOnly />
            <Link href="/dominio" className="dashboard-button" style={{ textDecoration: "none" }}>
              Cambiar
            </Link>
          </div>
        </article>
      ) : (
        <article className="dashboard-card">
          <p className="dashboard-eyebrow">Dominio propio</p>
          <h2>Elige tu .com</h2>
          <p className="dashboard-muted-text">
            Todavía no has elegido tu dominio. Puedes buscarlo y confirmarlo ahora — tarda menos de un minuto.
          </p>
          <Link href="/dominio" className="dashboard-button" style={{ textDecoration: "none", display: "inline-block" }}>
            Buscar mi dominio
          </Link>
        </article>
      )}
    </section>
  );
}
