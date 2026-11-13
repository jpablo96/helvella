import { Link } from 'react-router-dom'
import { HOME_PANEL_IDS } from '../../constants/home'
import { HERO_VIDEO_IS_PLACEHOLDER, HERO_VIDEO_URL } from '../../data/site'
import { revealDelay } from '../../utils/revealDelay'
import ArrowIcon from '../icons/ArrowIcon'
import { IconConstruction } from '../icons/BrandIcons'
import HomePanel from './HomePanel'
import HomeScrollHint from './HomeScrollHint'

export default function HomeHero() {
  return (
    <HomePanel id={HOME_PANEL_IDS.hero} className="home-panel--hero" initialVisible>
      <div className="hero home-reveal">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Video de presentación de Helvella"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="hero__scrim" aria-hidden="true" />
        {HERO_VIDEO_IS_PLACEHOLDER && (
          <p className="hero__placeholder-badge">
            <IconConstruction size={14} className="hero__placeholder-icon" />
            <span>
              <strong className="hero__placeholder-label">En construcción</strong>
              <span aria-hidden="true"> · </span>
              Video temporal de @cchflorist.mlk, no es propiedad de Helvella
            </span>
          </p>
        )}

        <header className="hero__content home-reveal" style={revealDelay(1)}>
          <h1 className="hero__heading">
            <span className="eyebrow">Flores eternas en Costa Rica</span>
            <span className="hero__title">
              Flores que el tiempo <em>no marchita</em>
            </span>
          </h1>
          <p className="hero__lead">
            Flores eternas hechas a mano con limpiapipas, pétalo a pétalo, con envíos a todo el
            país.
          </p>
          <div className="hero__actions">
            <Link to="/catalogo" className="btn btn-primary">
              Ver catálogo
              <ArrowIcon className="btn-icon btn-icon--arrow" />
            </Link>
          </div>
        </header>
      </div>
      <HomeScrollHint targetId={HOME_PANEL_IDS.featured} tone="ciruela" />
    </HomePanel>
  )
}
