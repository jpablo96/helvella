import { Link } from 'react-router-dom'
import ArrowIcon from '../components/icons/ArrowIcon'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo page="notFound" />
      <PageHero
        eyebrow="Error 404"
        title="Página no encontrada"
        lead="La página que buscas no existe o cambió de lugar."
      />
      <section className="section bg-beige">
        <div className="container section-header">
          <p className="section-subtitle">
            Te invitamos a conocer nuestras flores eternas hechas a mano.
          </p>
          <Link to="/catalogo" className="btn btn-primary">
            Ver catálogo
            <ArrowIcon className="btn-icon btn-icon--arrow" />
          </Link>
        </div>
      </section>
    </>
  )
}
