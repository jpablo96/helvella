interface PageHeroProps {
  title: string
  lead: string
  className?: string
}

export default function PageHero({ title, lead, className = '' }: PageHeroProps) {
  return (
    <section className={`page-hero${className ? ` ${className}` : ''}`}>
      <div className="container">
        <h1>{title}</h1>
        <p className="page-hero-lead">{lead}</p>
      </div>
    </section>
  )
}
