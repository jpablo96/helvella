import PageHero from '../components/PageHero'
import SocialLinks from '../components/SocialLinks'
import Seo from '../components/Seo'
import { FOUNDERS } from '../data/site'
import './About.css'

const ABOUT_IMAGE_URL = '/gallery/post1/post1.webp'

const values = [
  {
    title: 'Calidad artesanal',
    text: 'No producimos en masa. Cada flor es una obra única, elaborada con materiales seleccionados y técnicas perfeccionadas con el tiempo.',
  },
  {
    title: 'Atención personalizada',
    text: 'Trabajamos directamente contigo para entender lo que necesitas, ya sea un regalo, una decoración o un arreglo para un evento especial.',
  },
  {
    title: 'Pasión creativa',
    text: 'Amamos lo que hacemos y eso se refleja en cada pieza. Buscamos constantemente nuevas formas de expresar belleza a través de nuestras manos.',
  },
] as const

const upcomingLines = [
  { name: 'Crochet', text: 'piezas tejidas con amor' },
  { name: 'Pintura', text: 'obras originales y decorativas' },
  { name: 'Abalorios', text: 'accesorios y decoración' },
] as const

export default function About() {
  return (
    <>
      <Seo
        title="Nosotros"
        socialTitle="Quiénes Somos | Helvella — Arte y Manualidades"
        description="Conoce la historia de Helvella, nuestro amor por las manualidades y las flores eternas artesanales hechas a mano en Costa Rica."
        path="/nosotros"
      />
      <PageHero
        eyebrow="Nuestra historia"
        title="Quiénes somos"
        lead="Helvella nace del amor por las manualidades y el deseo de crear piezas que transmitan emoción y perduren en el tiempo."
      />

      <section className="section about-story bg-beige">
        <div className="container about-grid">
          <div className="about-text">
            <span className="eyebrow">Nuestra esencia</span>
            <h2>
              Arte con alma, <em>hecho en Costa Rica</em>
            </h2>
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
          <figure className="about-figure">
            <img
              src={ABOUT_IMAGE_URL}
              alt="Arreglo de rosas eternas hecho a mano por Helvella"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Hecho a mano, pétalo a pétalo</figcaption>
          </figure>
        </div>
      </section>

      <section className="section about-founders bg-beige">
        <div className="container">
          <header className="about-section-header">
            <span className="eyebrow">El equipo</span>
            <h2 className="section-title">Cofundadores</h2>
            <p className="section-subtitle">
              Helvella es un proyecto que construimos juntos. Somos Pablo y Naye, cofundadores
              que unen creatividad, diseño y artesanía en cada pieza.
            </p>
          </header>
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
          <header className="about-section-header">
            <span className="eyebrow">Valores</span>
            <h2 className="section-title">Lo que nos define</h2>
          </header>
          <ol className="values-grid">
            {values.map((value, index) => (
              <li key={value.title} className="value-card">
                <span className="value-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-future bg-beige">
        <div className="container">
          <div className="future-card">
            <span className="eyebrow eyebrow--light">Próximamente</span>
            <h2>Mirando hacia adelante</h2>
            <p>
              Las flores eternas nos dieron la primera voz, pero Helvella es más que eso.
              Queremos seguir creciendo en arte y manualidades:
            </p>
            <ul className="future-list">
              {upcomingLines.map((line) => (
                <li key={line.name}>
                  <strong>{line.name}</strong>
                  <span>{line.text}</span>
                </li>
              ))}
            </ul>
            <p className="future-note">
              Síguenos en redes para enterarte de los lanzamientos y novedades.
            </p>
            <SocialLinks size="lg" showLabels onDark />
          </div>
        </div>
      </section>
    </>
  )
}
