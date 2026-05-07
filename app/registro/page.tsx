import './registro.css';
import '../auth.css';
import Link from "next/link";

export default function RegistroPage() {
  return (
    <main className="auth-page auth-page-registro">
      <div className="auth-shell">
        <section className="auth-brand">
          <Link href="/">
            <img className="auth-logo" src="/assets/ONBOARDING1/LAARK logo vert 2.png" alt="LAARK" />
          </Link>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <div className="auth-kicker">Crear cuenta</div>
            <h1>Compra el acceso a LAARK</h1>
            <p>En el siguiente paso irás a Stripe. Al volver, crearás tu usuario y contraseña.</p>

            <div className="auth-summary" aria-label="Resumen de compra">
              <div className="auth-row">
                <span>Acceso LAARK</span>
                <strong>200 €</strong>
              </div>
              <div className="auth-row">
                <span>Hosting primer año</span>
                <strong>Incluido</strong>
              </div>
              <div className="auth-row auth-total">
                <span>Total</span>
                <strong>200 €</strong>
              </div>
            </div>

            <div className="auth-actions">
              <Link className="btn btn-primary" href="/pago">Continuar al pago</Link>
              <Link className="auth-link" href="/login">Ya tengo cuenta</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
