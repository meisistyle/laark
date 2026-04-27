"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { WebSlots, SkinName } from "@/lib/slots";
import { getProject, setSkin, saveProject } from "@/lib/storage";
import ChatPanel from "@/components/ChatPanel";
import SkinPreview from "@/components/SkinPreview";

type Section = "mi-web" | "contenido" | "disenos" | "imagenes" | "dominio" | "cuenta";

const NAV = [
  { id: "mi-web", icon: "⊡", label: "Mi web" },
  { id: "contenido", icon: "✦", label: "Contenido" },
  { id: "disenos", icon: "◈", label: "Diseños" },
  { id: "imagenes", icon: "⊞", label: "Imágenes" },
  { id: "dominio", icon: "◎", label: "Dominio" },
  { id: "cuenta", icon: "○", label: "Mi cuenta" },
] as const;

const SKINS: { name: SkinName; desc: string; bg: string; color: string }[] = [
  { name: "Luminous", desc: "Cálido, editorial, orgánico", bg: "linear-gradient(160deg,#F0EBE3,#D4C5B5)", color: "#4A3728" },
  { name: "Fresco", desc: "Limpio, fresco, profesional", bg: "linear-gradient(160deg,#E8EDF0,#B5C9D4)", color: "#2B3E4A" },
  { name: "Calma", desc: "Neutro, elegante, atemporal", bg: "linear-gradient(160deg,#F0EDE8,#C9C4B4)", color: "#3A3528" },
];

export default function Dashboard() {
  const [section, setSection] = useState<Section>("contenido");
  const [mobile, setMobile] = useState(false);
  const [slots, setSlots] = useState<WebSlots | null>(null);
  const [skin, setSkinState] = useState<SkinName>("Luminous");

  useEffect(() => {
    const p = getProject();
    setSlots(p.slots);
    setSkinState(p.skin);
  }, []);

  function handleSlotsUpdate(partial: Partial<WebSlots>) {
    setSlots(prev => prev ? { ...prev, ...partial } : prev);
  }

  function handleSkinChange(s: SkinName) {
    setSkinState(s);
    setSkin(s);
  }

  const filledSlots = slots ? Object.values(slots).filter(Boolean).length : 0;
  const totalSlots = 52;
  const progress = Math.round((filledSlots / totalSlots) * 100);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 220, background: "var(--ink)", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 50,
      }}>
        <div style={{ padding: "28px 24px 20px", fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 300, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cream)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Laark</Link>
        </div>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 13, color: "var(--cream)", fontWeight: 500 }}>Hola 👋</div>
          <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>plan estándar · 1 web</div>
        </div>
        <nav style={{ flex: 1, padding: "14px 10px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "12px 12px 6px" }}>mi web</div>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setSection(item.id as Section)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 2, fontSize: 13, textAlign: "left",
              background: section === item.id ? "rgba(255,255,255,0.1)" : "transparent",
              color: section === item.id ? "var(--cream)" : "rgba(255,255,255,0.5)",
              border: "none", cursor: "pointer", transition: "all 0.15s", marginBottom: 2,
            }}>
              <span style={{ width: 16, textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "14px 10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none",
          }}>← Salir</Link>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: 220, flex: 1, background: "var(--warm-white)", minHeight: "100vh" }}>

        {/* ── CONTENIDO (chat + preview) ── */}
        {section === "contenido" && (
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Chat */}
            <div style={{ width: 420, flexShrink: 0, borderRight: "1px solid var(--border)", height: "100vh", display: "flex", flexDirection: "column" }}>
              <ChatPanel onSlotsUpdate={handleSlotsUpdate} />
            </div>
            {/* Preview */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", background: "var(--cream)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Preview en tiempo real</div>
                  <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>skin: {skin} · se actualiza mientras escribes</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--success)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block", animation: "blink 2s infinite" }} />
                    en vivo
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["escritorio", "móvil"].map(d => (
                      <button key={d} onClick={() => setMobile(d === "móvil")} style={{
                        padding: "5px 12px", fontSize: 11, borderRadius: 3, cursor: "pointer",
                        border: "1px solid var(--border)", fontFamily: "var(--font-dm-sans)",
                        background: (mobile ? d === "móvil" : d === "escritorio") ? "var(--ink)" : "transparent",
                        color: (mobile ? d === "móvil" : d === "escritorio") ? "white" : "var(--ink-muted)",
                      }}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", justifyContent: "center" }}>
                {slots && <div style={{ width: "100%", maxWidth: mobile ? 340 : 680 }}>
                  <SkinPreview slots={slots} skin={skin} mobile={mobile} />
                </div>}
              </div>
            </div>
          </div>
        )}

        {/* ── MI WEB ── */}
        {section === "mi-web" && (
          <>
            <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "16px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Mi web</div>
              <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 12 }}>↗ ver en vivo</button>
            </div>
            <div style={{ padding: 36 }}>
              {/* Progreso */}
              <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Tu progreso</span>
                  <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>{progress}% completado</span>
                </div>
                <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden", marginBottom: 20 }}>
                  <div style={{ height: "100%", background: "var(--accent)", width: `${progress}%`, transition: "width 0.4s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {["cuenta", "contenido", "diseño", "fotos", "online"].map((step, i) => {
                    const done = i === 0 || (i === 1 && progress > 10);
                    const active = !done && i === (progress > 10 ? 2 : 1);
                    return (
                      <div key={step} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%", margin: "0 auto 6px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 500,
                          background: done ? "var(--success)" : active ? "var(--accent)" : "var(--border)",
                          color: done || active ? "white" : "var(--ink-muted)",
                        }}>
                          {done ? "✓" : i + 1}
                        </div>
                        <div style={{ fontSize: 10, color: active ? "var(--accent)" : "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{step}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: "var(--accent-pale)", border: "1px solid var(--accent-light)", borderRadius: "var(--radius-md)", padding: "18px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 4 }}>siguiente paso</div>
                  <div style={{ fontSize: 15 }}>{progress < 20 ? "Cuéntale a la IA sobre tu negocio" : "Elige tu diseño"}</div>
                </div>
                <button onClick={() => setSection(progress < 20 ? "contenido" : "disenos")} className="btn btn-accent" style={{ padding: "9px 18px", fontSize: 12 }}>
                  {progress < 20 ? "empezar →" : "ver diseños →"}
                </button>
              </div>

              {slots && <SkinPreview slots={slots} skin={skin} />}
            </div>
          </>
        )}

        {/* ── DISEÑOS ── */}
        {section === "disenos" && (
          <>
            <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "16px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Diseños</div>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>Cambia cuando quieras — tu contenido se mantiene</div>
            </div>
            <div style={{ padding: 36 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
                {SKINS.map(sk => (
                  <div key={sk.name} style={{
                    background: "white", border: `${skin === sk.name ? 2 : 1}px solid ${skin === sk.name ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius-md)", overflow: "hidden", cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                  >
                    <div style={{ height: 140, background: sk.bg, position: "relative" }}>
                      {skin === sk.name && (
                        <div style={{ position: "absolute", top: 10, right: 10, background: "var(--accent)", color: "white", fontSize: 10, padding: "3px 8px", borderRadius: 10, fontFamily: "var(--font-dm-sans)" }}>activo</div>
                      )}
                      <div style={{ position: "absolute", bottom: 12, left: 14, fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 300, color: sk.color }}>{sk.name}</div>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{sk.name}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 12 }}>{sk.desc}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-outline" style={{ fontSize: 12, padding: "7px 14px", flex: 1 }} onClick={() => handleSkinChange(sk.name)}>ver preview</button>
                        {skin !== sk.name && (
                          <button className="btn btn-accent" style={{ fontSize: 12, padding: "7px 14px", flex: 1 }} onClick={() => handleSkinChange(sk.name)}>elegir este</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {slots && <SkinPreview slots={slots} skin={skin} />}
            </div>
          </>
        )}

        {/* ── IMÁGENES ── */}
        {section === "imagenes" && (
          <>
            <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "16px 36px" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Imágenes</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>La plataforma ajusta proporciones automáticamente</div>
            </div>
            <div style={{ padding: 36 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { name: "Foto hero", desc: "Imagen principal · apaisado · mín. 1200px", span: 2, h: 180 },
                  { name: "Foto sobre mí", desc: "Cuadrado o retrato · mín. 800px", span: 1, h: 140 },
                  { name: "Foto servicio", desc: "Cuadrado · mín. 800px", span: 1, h: 140 },
                  { name: "Logo", desc: "PNG con fondo transparente", span: 1, h: 120 },
                  { name: "Galería adicional", desc: "Opcional · hasta 6 fotos", span: 1, h: 120 },
                ].map(slot => (
                  <div key={slot.name} style={{ gridColumn: slot.span === 2 ? "span 2" : "span 1", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{slot.name}</div>
                        <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>{slot.desc}</div>
                      </div>
                    </div>
                    <div style={{ height: slot.h, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, background: "var(--warm-white)", cursor: "pointer" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent-pale)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--warm-white)"; }}
                    >
                      <span style={{ fontSize: 28, color: "var(--ink-muted)" }}>+</span>
                      <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>subir foto</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── DOMINIO ── */}
        {section === "dominio" && (
          <>
            <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "16px 36px" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Dominio</div>
            </div>
            <div style={{ padding: 36 }}>
              <div style={{ background: "var(--success-light)", border: "1px solid #A8D5B5", borderRadius: "var(--radius-md)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{slots?.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>tu web está online en esta dirección</div>
                </div>
                <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 12, marginLeft: "auto" }}>↗ ver web</button>
              </div>
              <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Usar tu propio dominio</div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 18 }}>Si tienes un dominio propio (.com), puedes apuntarlo aquí. Tutorial de 10 minutos incluido.</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type="text" placeholder="tunegocio.com" style={{ flex: 1 }} />
                  <button className="btn btn-primary">conectar</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── CUENTA ── */}
        {section === "cuenta" && (
          <>
            <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "16px 36px" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Mi cuenta</div>
            </div>
            <div style={{ padding: 36, maxWidth: 600 }}>
              <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>Plan</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Estándar · 1 web</div>
                    <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>Pago único realizado · acceso de por vida</div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>Datos personales</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
                  <div><label>Email</label><input type="email" placeholder="tu@email.com" /></div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: 13, padding: "9px 20px" }}>guardar cambios</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
