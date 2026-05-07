"use client";
import './edit.css';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProject, updateSlots, setCurrentStep } from "@/lib/storage";

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
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [saved, setSaved]   = useState(false);
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

  const set = (key: keyof Content) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(prev => ({ ...prev, [key]: e.target.value }));
    setSaved(false);
  };

  const saveDraft = () => {
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
  };

  const publish = () => {
    saveDraft();
    setCurrentStep("done");
    // TODO: supabase.from('projects').update({ status: 'published' }).eq('user_id', userId)
    router.push("/dashboard");
  };

  const hl   = (s: string) => setActive(s);
  const uhl  = () => setActive(null);

  return (
    <div className="edit-root">
      <div className="edit-bar">
        <span className="edit-bar-logo">LAARK</span>
        <span className="edit-bar-label">· Editando tu web</span>
        <div className="edit-bar-btns">
          <button className="edit-btn-s" onClick={saveDraft}>
            {saved ? "Guardado ✓" : "Guardar borrador"}
          </button>
          <button className="edit-btn-p" onClick={publish}>Publicar</button>
        </div>
      </div>

      <div className="edit-body">
        {/* ── Left: fields ── */}
        <div className="edit-left">
          <div className="edit-sec">
            <div className="edit-sec-header">
              <div className="edit-sec-dot" />
              <span className="edit-sec-name">Hero</span>
            </div>
            <div className="edit-field">
              <input
                type="text"
                placeholder="Titular principal"
                value={content.heroTitular}
                onChange={set("heroTitular")}
                onFocus={() => hl("hero")}
                onBlur={uhl}
              />
            </div>
            <div className="edit-field">
              <input
                type="text"
                placeholder="Subtítulo"
                value={content.heroSub}
                onChange={set("heroSub")}
                onFocus={() => hl("hero")}
                onBlur={uhl}
              />
            </div>
          </div>

          <div className="edit-sec">
            <div className="edit-sec-header">
              <div className="edit-sec-dot" />
              <span className="edit-sec-name">Sobre mí</span>
            </div>
            <div className="edit-field">
              <input
                type="text"
                placeholder="Tu nombre"
                value={content.sobreTitulo}
                onChange={set("sobreTitulo")}
                onFocus={() => hl("sobre")}
                onBlur={uhl}
              />
            </div>
            <div className="edit-field">
              <textarea
                placeholder="Tu texto..."
                value={content.sobreTexto}
                onChange={set("sobreTexto")}
                onFocus={() => hl("sobre")}
                onBlur={uhl}
                rows={3}
              />
            </div>
          </div>

          <div className="edit-sec">
            <div className="edit-sec-header">
              <div className="edit-sec-dot" />
              <span className="edit-sec-name">Servicios</span>
            </div>
            <div className="edit-field">
              <input
                type="text"
                placeholder="Nombre del servicio"
                value={content.servTitulo}
                onChange={set("servTitulo")}
                onFocus={() => hl("serv")}
                onBlur={uhl}
              />
            </div>
            <div className="edit-field">
              <textarea
                placeholder="Descripción..."
                value={content.servTexto}
                onChange={set("servTexto")}
                onFocus={() => hl("serv")}
                onBlur={uhl}
                rows={3}
              />
            </div>
          </div>

          <div className="edit-sec">
            <div className="edit-sec-header">
              <div className="edit-sec-dot" />
              <span className="edit-sec-name">Contacto</span>
            </div>
            <div className="edit-field">
              <textarea
                placeholder="Mensaje de contacto..."
                value={content.contTexto}
                onChange={set("contTexto")}
                onFocus={() => hl("cont")}
                onBlur={uhl}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* ── Right: live preview ── */}
        <div className="edit-right">
          <div className="edit-preview">
            <div className={`ep-hero${active === "hero" ? " hl" : ""}`}>
              <div>
                <div className="ep-hero-t">
                  {content.heroTitular || "Tu titular aparecerá aquí"}
                </div>
                {content.heroSub && (
                  <div className="ep-hero-s">{content.heroSub}</div>
                )}
              </div>
            </div>

            <div className={`ep-sec${active === "sobre" ? " hl" : ""}`}>
              <div className="ep-sec-label">Sobre mí</div>
              <div className="ep-sec-title">{content.sobreTitulo || "Tu nombre"}</div>
              <div className="ep-sec-body">{content.sobreTexto || "Tu texto aparecerá aquí."}</div>
            </div>

            <div className="ep-imgs">
              <div className="ep-img" />
              <div className="ep-img" />
              <div className="ep-img" />
            </div>

            <div className={`ep-sec${active === "serv" ? " hl" : ""}`}>
              <div className="ep-sec-label">Servicios</div>
              <div className="ep-sec-title">{content.servTitulo || "Nombre del servicio"}</div>
              <div className="ep-sec-body">{content.servTexto || "Tu descripción aquí."}</div>
            </div>

            <div className={`ep-sec${active === "cont" ? " hl" : ""}`}>
              <div className="ep-sec-label">Contacto</div>
              <div className="ep-sec-body">{content.contTexto || "Tu texto aquí."}</div>
            </div>

            <div className="ep-footer">
              <p>{content.sobreTitulo ? content.sobreTitulo.toUpperCase() : "TU NOMBRE"} · 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
