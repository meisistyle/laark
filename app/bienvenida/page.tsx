import './bienvenida.css';
import '../auth.css';
import Link from "next/link";

export default function BienvenidaPage() {
  return (
    <main className="auth-page auth-page-bienvenida">
      <div className="auth-shell">
        <section className="auth-brand">
          <Link href="/">
            <img className="auth-logo" src="/assets/ONBOARDING2/LAARK logo vert 2.png" alt="LAARK" />
          </Link>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <div className="auth-kicker">Crear acceso</div>
            <h1>Crea tu usuario</h1>
            <form className="auth-form">
              <div className="auth-field">
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" placeholder="Tu nombre" />
              </div>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="auth-field">
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" placeholder="Crea una contraseña" />
              </div>
              <div className="auth-actions">
                <Link className="btn btn-primary" href="/dashboard">Entrar al panel</Link>
              </div>
            </form>

            <div className="auth-steps">
              <div className="auth-step"><span>1</span> Cuenta creada</div>
              <div className="auth-step"><span>2</span> Conversación con IA</div>
              <div className="auth-step"><span>3</span> Diseño, imágenes y publicación</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
