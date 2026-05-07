"use client";
import './cuenta.css';

import { useState } from "react";

export default function CuentaPage() {
  const [nombre, setNombre]   = useState("Laura");
  const [email, setEmail]     = useState("laura@ejemplo.com");
  const [passActual, setPassActual] = useState("");
  const [passNueva, setPassNueva]   = useState("");
  const [savedInfo, setSavedInfo]   = useState(false);
  const [savedPass, setSavedPass]   = useState(false);

  const initials = nombre.trim()
    ? nombre.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  function guardarDatos() {
    // Supabase: supabase.from('profiles').update({ nombre }).eq('id', user.id)
    //           supabase.auth.updateUser({ email })
    setSavedInfo(true);
    setTimeout(() => setSavedInfo(false), 2500);
  }

  function cambiarPassword() {
    // Supabase: supabase.auth.updateUser({ password: passNueva })
    setPassActual("");
    setPassNueva("");
    setSavedPass(true);
    setTimeout(() => setSavedPass(false), 2500);
  }

  function confirmarEliminar() {
    if (confirm("¿Segura? Esta acción eliminará tu cuenta y todos tus proyectos. No se puede deshacer.")) {
      // Supabase: supabase.rpc('delete_user') → supabase.auth.signOut() → router.push('/')
      alert("Cuenta eliminada");
    }
  }

  return (
    <div className="cuenta-wrap">

      <p className="cuenta-eyebrow">Ajustes</p>
      <h1 className="cuenta-title">Mi cuenta</h1>

      {/* ── Plan ── */}
      <div className="cuenta-section">
        <p className="cuenta-section-label">Plan</p>
        <p className="cuenta-plan-name">Estándar · 1 web</p>
        <p className="cuenta-plan-desc">Pago único realizado · acceso de por vida.</p>
        <span className="cuenta-plan-badge">Activo</span>
      </div>

      {/* ── Datos personales ── */}
      <div className="cuenta-section">
        <p className="cuenta-section-label">Datos personales</p>

        <div className="cuenta-avatar-row">
          <div className="cuenta-avatar" aria-label="Iniciales">
            {initials}
          </div>
          <p className="cuenta-avatar-info">
            Tus iniciales aparecen en el dashboard.
          </p>
        </div>

        <div className="cuenta-form-row">
          <div className="cuenta-form-group">
            <label className="cuenta-form-label" htmlFor="cuenta-nombre">Nombre</label>
            <input
              id="cuenta-nombre"
              className="cuenta-form-input"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="cuenta-form-group">
            <label className="cuenta-form-label" htmlFor="cuenta-email">Email</label>
            <input
              id="cuenta-email"
              className="cuenta-form-input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="cuenta-btn-primary" type="button" onClick={guardarDatos}>
          {savedInfo ? "Guardado ✓" : "Guardar cambios"}
        </button>
      </div>

      {/* ── Seguridad ── */}
      <div className="cuenta-section">
        <p className="cuenta-section-label">Seguridad</p>
        <div className="cuenta-form-row">
          <div className="cuenta-form-group">
            <label className="cuenta-form-label" htmlFor="cuenta-pass-actual">Contraseña actual</label>
            <input
              id="cuenta-pass-actual"
              className="cuenta-form-input"
              type="password"
              placeholder="••••••••"
              value={passActual}
              onChange={e => setPassActual(e.target.value)}
            />
          </div>
          <div className="cuenta-form-group">
            <label className="cuenta-form-label" htmlFor="cuenta-pass-nueva">Nueva contraseña</label>
            <input
              id="cuenta-pass-nueva"
              className="cuenta-form-input"
              type="password"
              placeholder="••••••••"
              value={passNueva}
              onChange={e => setPassNueva(e.target.value)}
            />
          </div>
        </div>
        <button className="cuenta-btn-secondary" type="button" onClick={cambiarPassword}>
          {savedPass ? "Contraseña actualizada ✓" : "Cambiar contraseña"}
        </button>
      </div>

      {/* ── Facturación ── */}
      <div className="cuenta-section">
        <p className="cuenta-section-label">Facturación</p>
        <div className="cuenta-factura-row">
          <div className="cuenta-factura-info">
            Acceso LAARK · Pago único
            <span>02 mayo 2025</span>
          </div>
          <button
            className="cuenta-factura-link"
            type="button"
            onClick={() => {
              // window.open('https://billing.stripe.com/...', '_blank')
            }}
          >
            Descargar factura
          </button>
        </div>
      </div>

      {/* ── Zona de peligro ── */}
      <div className="cuenta-section">
        <p className="cuenta-section-label">Cuenta</p>
        <p className="cuenta-danger-desc">
          Si eliminas tu cuenta, se borrarán todos tus proyectos y webs publicadas.
          Esta acción no se puede deshacer.
        </p>
        <button className="cuenta-btn-danger" type="button" onClick={confirmarEliminar}>
          Eliminar mi cuenta
        </button>
      </div>

    </div>
  );
}
