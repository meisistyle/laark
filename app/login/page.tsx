import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="auth-page auth-page-login">
      <div className="auth-shell">
        <section className="auth-brand">
          <Link href="/">
            <img className="auth-logo" src="/assets/ONBOARDING3/LAARK logo vert 2.png" alt="LAARK" />
          </Link>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <div className="auth-kicker">Iniciar sesión</div>
            <h1>Accede a LAARK</h1>
            <form className="auth-form">
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="auth-field">
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" placeholder="Tu contraseña" />
              </div>
              <div className="auth-actions">
                <Link className="btn btn-primary" href="/dashboard">Entrar</Link>
                <Link className="auth-link" href="/registro">Comprar acceso</Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
