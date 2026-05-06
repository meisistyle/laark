"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getProject, saveProject, setCurrentStep } from "@/lib/storage";

type CheckState = "idle" | "checking" | "available" | "taken" | "uncertain";

export default function DominioPage() {
  const router = useRouter();
  const [input, setInput]             = useState("");
  const [checkState, setCheckState]   = useState<CheckState>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debounceRef                   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-fill from project name
  useEffect(() => {
    const p = getProject();
    const raw = p.slots.negocio_nombre || "";
    if (raw) setInput(raw.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  }, []);

  // Debounced DNS check
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const clean = input.trim();
    if (!clean) { setCheckState("idle"); setSuggestions([]); return; }

    setCheckState("checking");
    debounceRef.current = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/domain-check?name=${encodeURIComponent(clean)}`);
        const data = await res.json() as { domain: string; available: boolean | null; suggestions?: string[] };
        if (data.available === true) {
          setCheckState("available");
          setSuggestions([]);
        } else if (data.available === false) {
          setCheckState("taken");
          setSuggestions(data.suggestions ?? []);
        } else {
          setCheckState("uncertain");
          setSuggestions([]);
        }
      } catch {
        setCheckState("uncertain");
      }
    }, 600);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [input]);

  function handleConfirm() {
    const clean = input.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!clean || checkState !== "available") return;
    const p = getProject();
    p.domain        = clean + ".com";
    p.domain_status = "confirmed";
    p.currentStep   = "edit";
    saveProject(p);
    router.push("/edit");
  }

  function handleSkip() {
    const p = getProject();
    p.domain_status = "pending";
    p.currentStep   = "edit";
    saveProject(p);
    router.push("/dashboard");
  }

  function selectSuggestion(domain: string) {
    const withoutTld = domain.replace(/\.com$/, "");
    setInput(withoutTld);
  }

  const statusLabel: Record<CheckState, string> = {
    idle:      "",
    checking:  "Comprobando disponibilidad…",
    available: "Disponible",
    taken:     "Este dominio ya está registrado",
    uncertain: "No se pudo comprobar la disponibilidad",
  };

  const inputClass =
    checkState === "available" ? "dominio-input-row dominio-input--available" :
    checkState === "taken"     ? "dominio-input-row dominio-input--taken" :
    "dominio-input-row";

  const statusClass =
    checkState === "available" ? "dominio-status dominio-status--available" :
    checkState === "taken"     ? "dominio-status dominio-status--taken" :
    checkState === "checking"  ? "dominio-status dominio-status--checking" :
    "dominio-status dominio-status--uncertain";

  return (
    <div className="dominio-root">
      <div className="dominio-card">
        <p className="dominio-eyebrow">Tu web</p>
        <h1 className="dominio-title">Ya casi está.<br />¿Cómo se va a llamar?</h1>
        <p className="dominio-subtitle">
          Escribe el nombre que quieres para tu web. Buscaremos si el dominio
          está libre — y si no, te damos alternativas.
        </p>

        <div className={inputClass}>
          <input
            className="dominio-input"
            type="text"
            placeholder="tunegocio"
            value={input}
            onChange={e => setInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          <span className="dominio-suffix">.com</span>
        </div>

        <p className={statusClass}>{statusLabel[checkState]}</p>

        {checkState === "taken" && suggestions.length > 0 && (
          <div className="dominio-suggestions">
            <p className="dominio-suggestions-label">Alternativas disponibles</p>
            <div className="dominio-suggestions-list">
              {suggestions.map(s => (
                <button
                  key={s}
                  className="dominio-suggestion"
                  type="button"
                  onClick={() => selectSuggestion(s)}
                >
                  <span className="dominio-suggestion-name">{s}</span>
                  <span className="dominio-suggestion-use">Usar este</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="dominio-actions">
          <button
            className="dominio-btn-primary"
            type="button"
            onClick={handleConfirm}
            disabled={checkState !== "available"}
          >
            Confirmar dominio
          </button>
          <button className="dominio-btn-skip" type="button" onClick={handleSkip}>
            Elegirlo más tarde
          </button>
        </div>
      </div>
    </div>
  );
}
