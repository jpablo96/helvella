interface PageHeroProps {
  title: string
  lead: string
  eyebrow?: string
}

export default function PageHero({ title, lead, eyebrow }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow eyebrow--light">{eyebrow}</span>}
        <h1>{title}</h1>
        <p className="page-hero-lead">{lead}</p>
      </div>
    </section>
  )
}
