import './PageHero.css'

interface PageHeroProps {
  title: string
  lead: string
  eyebrow?: string
}

export default function PageHero({ title, lead, eyebrow }: PageHeroProps) {
  return (
    <section className="page-hero surface-ciruela">
      <div className="container page-hero__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <span className="ornament" aria-hidden="true">
          <span />
        </span>
        <p className="page-hero-lead">{lead}</p>
      </div>
    </section>
  )
}
