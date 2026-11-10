import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import Seo from '../components/Seo'
import SocialLinks from '../components/SocialLinks'
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

function StorySection() {
  return (
    <section className="section bg-beige">
      <div className="container about-grid">
        <div className="about-text">
          <span className="eyebrow">Nuestra esencia</span>
          <h2>
            Arte con alma, <em>hecho en Costa Rica</em>
          </h2>
          <p>
            Somos un emprendimiento costarricense dedicado al arte y las manualidades. Cada pieza
            que creamos lleva horas de dedicación, paciencia y cariño, porque creemos que lo hecho
            a mano tiene un valor especial que no se puede replicar.
          </p>
          <p>
            Hoy nos expresamos principalmente a través de las <strong>flores eternas</strong>,
            elaboradas con limpiapipas de alta calidad. Cada pétalo, cada tallo y cada detalle es
            cuidadosamente formado para lograr piezas realistas y llenas de vida. Para nosotros eso
            es solo el comienzo. Nos mueve imaginar, experimentar y dar forma a las cosas con
            nuestras propias manos. Es nuestra manera de contar historias y compartir algo genuino.
          </p>
        </div>
        <figure className="about-figure framed">
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
  )
}

function FoundersSection() {
  return (
    <section className="section bg-beige">
      <div className="container">
        <SectionHeader
          eyebrow="El equipo"
          title="Cofundadores"
          subtitle="Helvella es un proyecto que construimos juntos. Somos Pablo y Naye, cofundadores que unen creatividad, diseño y artesanía en cada pieza."
        />
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
  )
}

function ValuesSection() {
  return (
    <section className="section bg-beige">
      <div className="container">
        <SectionHeader eyebrow="Valores" title="Lo que nos define" />
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
  )
}

function FutureSection() {
  return (
    <section className="section bg-beige">
      <div className="container">
        <div className="future-card surface-ciruela framed">
          <span className="eyebrow">Próximamente</span>
          <h2>Mirando hacia adelante</h2>
          <p>
            Seguimos creando nuevas flores, macetitas y arreglos. Síguenos en redes para enterarte
            de los lanzamientos y novedades.
          </p>
          <SocialLinks size="lg" showLabels onDark />
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <Seo page="about" />
      <PageHero
        eyebrow="Nuestra historia"
        title="Quiénes somos"
        lead="Helvella es un taller de flores eternas en Costa Rica. Nace del amor por las manualidades y el deseo de crear piezas que transmitan emoción y perduren en el tiempo."
      />
      <StorySection />
      <FoundersSection />
      <ValuesSection />
      <FutureSection />
    </>
  )
}
