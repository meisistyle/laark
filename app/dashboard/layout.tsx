"use client";
import './dashboard.css';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getProject, getAllProjects, setActiveProjectId, createNewProject } from "@/lib/storage";
import { LaarkProject } from "@/lib/slots";
import { Icon, IconName } from "./_shared";

const NAV: { href: string; icon: IconName; label: string }[] = [
  { href: "/dashboard",           icon: "home",    label: "Mi web"    },
  { href: "/dashboard/contenido", icon: "chat",    label: "Contenido" },
  { href: "/dashboard/disenos",   icon: "palette", label: "Diseños"   },
  { href: "/dashboard/imagenes",  icon: "image",   label: "Imágenes"  },
  { href: "/dashboard/dominio",   icon: "globe",   label: "Dominio"   },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const [projects, setProjects]   = useState<LaarkProject[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { loadProjects(); }, []);

  function loadProjects() {
    const all     = getAllProjects();
    const current = getProject();
    const idx     = all.findIndex(p => p.project_id === current.project_id);
    setProjects(all);
    setActiveIdx(Math.max(0, idx));
  }

  function switchTo(idx: number) {
    const p = projects[idx];
    if (!p) return;
    setActiveIdx(idx);
    setActiveProjectId(p.project_id);
    router.refresh();
  }

  function handleNewProject() {
    createNewProject();
    router.push("/onboarding");
  }

  const active      = projects[activeIdx];
  const hasMultiple = projects.length > 1;

  /* which nav item is active — also highlight imagenes when on imagenes_abiertas */
  function isActive(href: string) {
    if (href === "/dashboard/imagenes") {
      return pathname === "/dashboard/imagenes" || pathname.startsWith("/dashboard/imagenes_abiertas");
    }
    return pathname === href;
  }

  return (
    <div className="db-layout">
      {/* ── Sidebar ── */}
      <aside className="db-sidebar">
        <Link className="db-sidebar-logo" href="/" aria-label="Volver a la home">
          <img src="/assets/LAARK logo horiz.png" alt="LAARK" />
        </Link>

        <nav className="db-sidebar-nav" aria-label="Dashboard">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`db-nav-item${isActive(item.href) ? " is-active" : ""}`}
            >
              <span className="db-nav-icon">
                <Icon name={item.icon} />
              </span>
              <span className="db-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Project switcher — shown when multiple projects */}
        {hasMultiple && (
          <div className="db-project-switcher">
            <span className="db-project-label">
              {active?.slots.negocio_nombre || "Proyecto activo"}
            </span>
            <div className="db-project-arrows">
              <button
                type="button"
                onClick={() => switchTo((activeIdx - 1 + projects.length) % projects.length)}
                aria-label="Proyecto anterior"
              >‹</button>
              <span>{activeIdx + 1}/{projects.length}</span>
              <button
                type="button"
                onClick={() => switchTo((activeIdx + 1) % projects.length)}
                aria-label="Proyecto siguiente"
              >›</button>
            </div>
          </div>
        )}

        {/* Bottom: Cuenta + Salir */}
        <div className="db-sidebar-bottom">
          <Link
            href="/dashboard/cuenta"
            className={`db-bottom-link${pathname === "/dashboard/cuenta" ? " is-active" : ""}`}
          >
            <span className="db-nav-icon">
              <Icon name="user" />
            </span>
            <span className="db-nav-label">Cuenta</span>
          </Link>

          <Link href="/" className="db-bottom-link db-bottom-exit">
            <span className="db-exit-icon-wrap">
              <Icon name="arrow" />
            </span>
            <span className="db-nav-label">Salir</span>
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="db-main">
        {children}
      </main>
    </div>
  );
}
