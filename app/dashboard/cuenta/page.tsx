"use client";

import { SectionHeader } from "../_shared";

export default function CuentaPage() {
  return (
    <section className="dashboard-section dashboard-section-narrow">
      <SectionHeader title="Mi cuenta" eyebrow="Ajustes" />

      <article className="dashboard-card">
        <p className="dashboard-eyebrow">Plan</p>
        <h2>Estándar · 1 web</h2>
        <p className="dashboard-muted-text">Pago único realizado · acceso de por vida.</p>
      </article>

      <article className="dashboard-card">
        <p className="dashboard-eyebrow">Datos personales</p>
        <div className="dashboard-form-grid">
          <label>Nombre<input type="text" placeholder="Tu nombre" /></label>
          <label>Email<input type="email" placeholder="tu@email.com" /></label>
        </div>
        <button className="dashboard-button dashboard-button-outline" type="button">
          Guardar cambios
        </button>
      </article>
    </section>
  );
}
