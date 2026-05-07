import './pago.css';
import Link from "next/link";

export default function PagoPage() {
  return (
    <main className="auth-page auth-page-pago">
      <div className="auth-shell">
        <section className="auth-brand">
          <Link href="/">
            <img className="auth-logo" src="/assets/ONBOARDING1/LAARK logo vert 2.png" alt="LAARK" />
          </Link>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <div className="auth-kicker">Resumen</div>
            <h1>LAARK · 200 €</h1>
            <div className="auth-summary">
              <div className="auth-row">
                <span>Constructor web guiado por IA</span>
                <strong>Incluido</strong>
              </div>
              <div className="auth-row">
                <span>Skins diseñadas por Elena</span>
                <strong>Incluido</strong>
              </div>
              <div className="auth-row">
                <span>Primer año de hosting</span>
                <strong>Incluido</strong>
              </div>
              <div className="auth-row auth-total">
                <span>Total</span>
                <strong>200 €</strong>
              </div>
            </div>
            <div className="auth-actions">
              <Link className="btn btn-primary" href="/bienvenida">Simular pago correcto</Link>
              <Link className="auth-link" href="/registro">Volver</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
