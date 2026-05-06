"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/storage";
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
  const isHome   = pathname === "/dashboard";

  const [businessName, setBusinessName] = useState("Tu proyecto");
  const [progress, setProgress]         = useState(0);
  const [filledSlots, setFilledSlots]   = useState(0);
  const [chatCount, setChatCount]       = useState(0);

  useEffect(() => {
    const p     = getProject();
    const filled = countFilledSlots(p.slots);
    const total  = totalSlots();
    setBusinessName(p.slots.negocio_nombre || "Tu proyecto");
    setFilledSlots(filled);
    setProgress(total ? Math.round((filled / total) * 100) : 0);
    setChatCount(p.chatHistory.length);
  }, []);

  return (
    <div className={`laark-dashboard${isHome ? " is-home" : ""}`}>
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" href="/" aria-label="Volver a la home de LAARK">
          <img src="/assets/LAARK logo horiz.png" alt="LAARK" />
        </Link>

        <div className="dashboard-account-card">
          <div>
            <p>Proyecto activo</p>
            <strong>{businessName}</strong>
          </div>
          <span>{progress}%</span>
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
