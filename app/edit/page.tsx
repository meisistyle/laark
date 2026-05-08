"use client";
import './edit.css';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProject, updateSlots, setCurrentStep } from "@/lib/storage";
import SkinPreview from "@/components/SkinPreview";
import { WebSlots, SkinName } from "@/lib/slots";

/* ── Nav links matching dashboard sidebar ── */
const NAV = [
  { href: "/dashboard",           label: "Mi web"    },
  { href: "/dashboard/contenido", label: "Contenido" },
  { href: "/dashboard/disenos",   label: "Diseños"   },
  { href: "/dashboard/imagenes",  label: "Imágenes"  },
  { href: "/dashboard/dominio",   label: "Dominio"   },
];

interface Content {
  heroTitular: string;
  heroSub:     string;
  sobreTitulo: string;
  sobreTexto:  string;
  servTitulo:  string;
  servTexto:   string;
  contTexto:   string;
}

export default function EditPage() {
  const router   = useRouter();
  const pathname = usePathname();

  const [saved, setSaved]     = useState(false);
  const [skin, setSkin]       = useState<SkinName>("Skin1");
  const [slots, setSlots]     = useState<WebSlots | null>(null);
  const [projectName, setProjectName] = useState("Tu proyecto");
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [pendingImageKey, setPendingImageKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<Content>({
    heroTitular: "",
    heroSub:     "",
    sobreTitulo: "",
    sobreTexto:  "",
    servTitulo:  "",
    servTexto:   "",
    contTexto:   "",
  });

  useEffect(() => {
    const p = getProject();
    const s = p.slots;
    setSlots(s);
    setSkin(p.skin);
    setProjectName(s.negocio_nombre || "Tu proyecto");
    setContent({
      heroTitular: s.home_hero_titular     || "",
      heroSub:     s.home_hero_subtitular  || "",
      sobreTitulo: s.sobremi_nombre        || "",
      sobreTexto:  s.sobremi_bio_corta     || "",
      servTitulo:  s.servicio_nombre       || "",
      servTexto:   s.servicio_subtitulo    || "",
      contTexto:   s.contacto_mensaje_intro || "",
    });
  }, []);

  const set = (key: keyof Content) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...content, [key]: e.target.value };
      setContent(next);
      setSaved(false);
      /* Update slots live so preview refreshes */
      setSlots(prev => prev ? {
        ...prev,
        home_hero_titular:      next.heroTitular,
        home_hero_subtitular:   next.heroSub,
        sobremi_nombre:         next.sobreTitulo,
        sobremi_bio_corta:      next.sobreTexto,
        servicio_nombre:        next.servTitulo,
        servicio_subtitulo:     next.servTexto,
        contacto_mensaje_intro: next.contTexto,
      } : prev);
    };

  function handleImageClick(key: string) {
    setPendingImageKey(key);
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !pendingImageKey) return;
    const url = URL.createObjectURL(file);
    setImageOverrides(prev => ({ ...prev, [pendingImageKey]: url }));
    setPendingImageKey(null);
    e.target.value = "";
  }

  function saveDraft() {
    updateSlots({
      home_hero_titular:      content.heroTitular,
      home_hero_subtitular:   content.heroSub,
      sobremi_nombre:         content.sobreTitulo,
      sobremi_bio_corta:      content.sobreTexto,
      servicio_nombre:        content.servTitulo,
      servicio_subtitulo:     content.servTexto,
      contacto_mensaje_intro: content.contTexto,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function publish() {
    saveDraft();
    setCurrentStep("done");
    router.push("/dashboard");
  }

  return (
    <div className="edit-layout">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* ── Sidebar (matches dashboard) ── */}
      <aside className="edit-sidebar">
        <Link className="edit-sidebar-logo" href="/" aria-label="Volver a la home">
          <img src="/assets/LAARK logo horiz.png" alt="LAARK" />
        </Link>

        <nav className="edit-sidebar-nav">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`edit-nav-item${pathname === item.href ? " is-active" : ""}`}
            >
              <span className="edit-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="edit-sidebar-bottom">
          <Link href="/dashboard/cuenta" className="edit-bottom-link">
            <span>Cuenta</span>
          </Link>
          <Link href="/" className="edit-bottom-link edit-bottom-exit">
            <span className="edit-exit-icon">→</span>
            <span>Salir</span>
          </Link>
        </div>
      </aside>

      {/* ── Editor ── */}
      <div className="edit-editor">

        {/* Top: project name + actions */}
        <div className="edit-editor-top">
          <h1 className="edit-project-name">{projectName}</h1>
          <div className="edit-top-actions">
            <button className="edit-btn-save" type="button" onClick={saveDraft}>
              {saved ? "Guardado ✓" : "Guardar"}
            </button>
            <button className="edit-btn-publish" type="button" onClick={publish}>
              Publicar
            </button>
          </div>
        </div>

        {/* ── Sección: Cabecera ── */}
        <div className="edit-section">
          <div className="edit-section-label">Cabecera</div>

          <div className="edit-field-box">
            <input
              type="text"
              className="edit-input"
              placeholder="Titular principal"
              value={content.heroTitular}
              onChange={set("heroTitular")}
            />
          </div>
          <div className="edit-field-box">
            <input
              type="text"
              className="edit-input"
              placeholder="Subtítulo"
              value={content.heroSub}
              onChange={set("heroSub")}
            />
          </div>
        </div>

        {/* ── Sección: Sobre mí ── */}
        <div className="edit-section">
          <div className="edit-section-label">Sobre mí</div>

          <div className="edit-field-box">
            <input
              type="text"
              className="edit-input"
              placeholder="Tu nombre"
              value={content.sobreTitulo}
              onChange={set("sobreTitulo")}
            />
          </div>
          <div className="edit-field-box">
            <textarea
              className="edit-input edit-textarea"
              placeholder="Tu texto"
              value={content.sobreTexto}
              onChange={set("sobreTexto")}
              rows={3}
            />
          </div>
        </div>

        {/* ── Sección: Servicios ── */}
        <div className="edit-section">
          <div className="edit-section-label">Servicios</div>

          <div className="edit-field-box">
            <input
              type="text"
              className="edit-input"
              placeholder="Nombre del servicio"
              value={content.servTitulo}
              onChange={set("servTitulo")}
            />
          </div>
          <div className="edit-field-box edit-field-box--tall">
            <textarea
              className="edit-input edit-textarea"
              placeholder="Descripción"
              value={content.servTexto}
              onChange={set("servTexto")}
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* ── Right: web preview ── */}
      <div className="edit-preview-panel">
        {slots && <SkinPreview slots={slots} skin={skin} editMode onImageClick={handleImageClick} imageOverrides={imageOverrides} />}
      </div>
    </div>
  );
}
