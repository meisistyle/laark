"use client";
import './dominio-dashboard.css';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/storage";
import { LaarkProject } from "@/lib/slots";

function subdomain(p: LaarkProject) {
  const name = p.slots.negocio_nombre || "tunegocio";
  return name.toLowerCase().replace(/\s+/g, "") + ".laark.io";
}

function isOnline(p: LaarkProject) {
  const steps = ["onboarding","chat","photos","generating","reveal","dominio","edit","done"];
  return steps.indexOf(p.currentStep) >= steps.indexOf("done");
}

export default function DominioPag() {
  const [projects, setProjects] = useState<LaarkProject[]>([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  return (
    <section className="dom-screen" aria-label="Dominios">
      <header className="dom-header">
        <h1 className="dom-title">Dominios</h1>
      </header>

      <div className="dom-list">
        {projects.map((p, i) => {
          const name    = p.slots.negocio_nombre || "Mi proyecto";
          const sub     = subdomain(p);
          const online  = isOnline(p);
          const hasDom  = p.domain_status === "confirmed" && p.domain;

          return (
            <div key={p.project_id} className="dom-row-group">
              {/* ── Project row ── */}
              <div className="dom-row">
                <div className="dom-row-left">
                  <span className="dom-project-name">{name}</span>
                  <div className="dom-domain-info">
                    <span className="dom-subdomain-text">
                      {hasDom ? p.domain! : sub}
                    </span>
                    {hasDom && (
                      <span className="dom-subdomain-text dom-subdomain-secondary">{sub}</span>
                    )}
                  </div>
                </div>
                <div className="dom-row-right">
                  <span className={`dom-status-dot${online ? " is-online" : ""}`} />
                  <span className="dom-status-label">
                    {online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              {/* ── Connect domain CTA (first project or when no domain) ── */}
              {(i === 0 || !hasDom) && (
                <div className="dom-connect-row">
                  <Link href="/dominio" className="dom-connect-btn">
                    Conectar con mi dominio
                  </Link>
                </div>
              )}

              <div className="dom-separator" />
            </div>
          );
        })}

        {/* If no projects */}
        {projects.length === 0 && (
          <div className="dom-empty">
            <p>Aún no tienes ninguna web creada.</p>
            <Link href="/onboarding" className="dom-connect-btn">
              Crear mi web
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
