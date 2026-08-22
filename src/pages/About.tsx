import SocialLinks from '../components/SocialLinks'
import Seo from '../components/Seo'
import { FOUNDERS } from '../data/site'
import './About.css'

export default function About() {
  return (
    <>
      <Seo
        title="Nosotros"
        socialTitle="Quiénes Somos | Helvella — Arte y Manualidades"
        description="Conoce la historia de Helvella, nuestro amor por las manualidades y las flores eternas artesanales hechas a mano en Costa Rica."
        path="/nosotros"
      />
      <section className="about-hero page-hero">
        <div className="container">
          <span className="about-badge">Nuestra historia</span>
          <h1>Quiénes somos</h1>
          <p className="page-hero-lead">
            Helvella nace del amor por las manualidades y el deseo de crear piezas que
            transmitan emoción y perduren en el tiempo.
          </p>
        </div>
      </section>

      <section className="section about-story bg-beige">
        <div className="container about-grid">
          <div className="about-text">
            <h2>Nuestra esencia</h2>
            <p>
              Somos un emprendimiento costarricense dedicado al arte y las manualidades.
              Cada pieza que creamos lleva horas de dedicación, paciencia y cariño, porque
              creemos que lo hecho a mano tiene un valor especial que no se puede replicar.
            </p>
            <p>
              Hoy nos expresamos principalmente a través de las <strong>flores eternas</strong>,
              elaboradas con limpiapipas de alta calidad. Cada pétalo, cada tallo y cada detalle
              es cuidadosamente formado para lograr piezas realistas y llenas de vida. Para
              nosotros eso es solo el comienzo. Nos mueve imaginar, experimentar y dar forma a las
              cosas con nuestras propias manos. Es nuestra manera de contar historias y compartir
              algo genuino.
            </p>
          </div>
          <div className="about-visual" aria-hidden="true">
            <div className="about-card">
              <span className="about-card-icon">✿</span>
              <p>Arte con alma,<br />hecho en Costa Rica</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-founders bg-beige">
        <div className="container">
          <h2 className="section-title about-founders-title">Cofundadores</h2>
          <p className="about-founders-lead">
            Helvella es un proyecto que construimos juntos. Somos Pablo y Naye, cofundadores
            que unen creatividad, diseño y artesanía en cada pieza.
          </p>
          <div className="founders-grid">
            {FOUNDERS.map((founder) => (
              <article key={founder.name} className="founder-card">
                <div className="founder-avatar" aria-hidden="true">
                  {founder.photo ? (
                    <img src={founder.photo} alt="" className="founder-photo" />
                  ) : (
                    <span className="founder-initial">{founder.initial}</span>
                  )}
                </div>
                <h3>{founder.name}</h3>
                <p>{founder.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-values bg-beige">
        <div className="container">
          <h2 className="section-title about-values-title">Lo que nos define</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Calidad artesanal</h3>
              <p>
                No producimos en masa. Cada flor es una obra única, elaborada con materiales
                seleccionados y técnicas perfeccionadas con el tiempo.
              </p>
            </div>
            <div className="value-card">
              <h3>Atención personalizada</h3>
              <p>
                Trabajamos directamente contigo para entender lo que necesitas, ya sea un
                regalo, una decoración o un arreglo para un evento especial.
              </p>
            </div>
            <div className="value-card">
              <h3>Pasión creativa</h3>
              <p>
                Amamos lo que hacemos y eso se refleja en cada pieza. Buscamos constantemente
                nuevas formas de expresar belleza a través de nuestras manos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-future bg-beige">
        <div className="container">
          <div className="future-card">
            <h2>Mirando hacia adelante</h2>
            <p>
              Las flores eternas nos dieron la primera voz, pero Helvella es más que eso.
              Queremos seguir creciendo en arte y manualidades:
            </p>
            <ul className="future-list">
              <li>
                <span className="future-tag">Próximamente</span>
                <strong>Crochet</strong>, piezas tejidas con amor
              </li>
              <li>
                <span className="future-tag">Próximamente</span>
                <strong>Pintura</strong>, obras originales y decorativas
              </li>
              <li>
                <span className="future-tag">Próximamente</span>
                <strong>Abalorios</strong>, accesorios y decoración
              </li>
            </ul>
            <p className="future-note">
              Síguenos en redes para enterarte de los lanzamientos y novedades.
            </p>
            <SocialLinks size="lg" showLabels />
          </div>
        </div>
      </section>
    </>
  )
}