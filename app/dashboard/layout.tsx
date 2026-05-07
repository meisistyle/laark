"use client";
import './dashboard.css';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getProject, getAllProjects, setActiveProjectId, createNewProject } from "@/lib/storage";
import { LaarkProject } from "@/lib/slots";
import { countFilledSlots, totalSlots } from "@/lib/slots";
import { Icon, IconName } from "./_shared";

const NAV: { href: string; icon: IconName; label: string; hint: string }[] = [
  { href: "/dashboard",            icon: "home",    label: "Mi web",    hint: "Resumen y próximos pasos" },
  { href: "/dashboard/contenido",  icon: "chat",    label: "Contenido", hint: "Conversación con la IA" },
  { href: "/dashboard/disenos",    icon: "palette", label: "Diseños",   hint: "Skins disponibles" },
  { href: "/dashboard/imagenes",   icon: "image",   label: "Imágenes",  hint: "Fotos y logo" },
  { href: "/dashboard/dominio",    icon: "globe",   label: "Dominio",   hint: "URL y dominio propio" },
  { href: "/dashboard/cuenta",     icon: "user",    label: "Cuenta",    hint: "Plan y datos" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const isHome   = pathname === "/dashboard";

  const [projects, setProjects]     = useState<LaarkProject[]>([]);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [progress, setProgress]     = useState(0);
  const [filledSlots, setFilledSlots] = useState(0);
  const [chatCount, setChatCount]   = useState(0);

  useEffect(() => { loadProjects(); }, []);

  function loadProjects() {
    const all     = getAllProjects();
    const current = getProject();
    const idx     = all.findIndex(p => p.project_id === current.project_id);
    setProjects(all);
    setActiveIdx(Math.max(0, idx));
    updateStats(current);
  }

  function updateStats(p: LaarkProject) {
    const filled = countFilledSlots(p.slots);
    const total  = totalSlots();
    setFilledSlots(filled);
    setProgress(total ? Math.round((filled / total) * 100) : 0);
    setChatCount(p.chatHistory.length);
  }

  function switchTo(idx: number) {
    const p = projects[idx];
    if (!p) return;
    setActiveIdx(idx);
    setActiveProjectId(p.project_id);
    updateStats(p);
    // Refresh current page so all sections reload with new project data
    router.refresh();
  }

  function handleNewProject() {
    createNewProject();
    router.push("/onboarding");
  }

  const active = projects[activeIdx];
  const businessName = active?.slots.negocio_nombre || "Tu proyecto";
  const hasMultiple  = projects.length > 1;

  return (
    <div className={`laark-dashboard${isHome ? " is-home" : ""}`}>
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" href="/" aria-label="Volver a la home de LAARK">
          <img src="/assets/LAARK logo horiz.png" alt="LAARK" />
        </Link>

        {/* Project carousel */}
        <div className="dashboard-account-card">
          <div style={{ flex: 1, minWidth: 0 }}>
            <p>Proyecto activo</p>
            <strong style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {businessName}
            </strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span>{progress}%</span>
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => switchTo((activeIdx - 1 + projects.length) % projects.length)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", opacity: 0.6 }}
                  aria-label="Proyecto anterior"
                >‹</button>
                <span style={{ fontSize: 10, opacity: 0.5 }}>{activeIdx + 1}/{projects.length}</span>
                <button
                  type="button"
                  onClick={() => switchTo((activeIdx + 1) % projects.length)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", opacity: 0.6 }}
                  aria-label="Proyecto siguiente"
                >›</button>
              </>
            )}
          </div>
        </div>

        <div className="dashboard-cache-note">
          <small>{filledSlots} campos · {chatCount} mensajes</small>
        </div>

        <nav className="dashboard-nav" aria-label="Navegación del dashboard">
          <p className="dashboard-nav-label">Tu web</p>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-nav-item${pathname === item.href ? " is-active" : ""}`}
            >
              <Icon name={item.icon} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
            </Link>
          ))}
        </nav>

        {/* New project button */}
        <button
          type="button"
          onClick={handleNewProject}
          className="dashboard-nav-item"
          style={{ marginTop: 8, opacity: 0.55, fontSize: 12 }}
        >
          <Icon name="arrow" />
          <span>
            <strong>Nueva web</strong>
            <small>Crear otro proyecto</small>
          </span>
        </button>

        <Link className="dashboard-exit" href="/">
          <Icon name="arrow" />
          Salir a la home
        </Link>
      </aside>

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
