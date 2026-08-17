interface HomeScrollHintProps {
  targetId: string
  tone?: 'beige' | 'ciruela'
}

export default function HomeScrollHint({ targetId, tone = 'beige' }: HomeScrollHintProps) {
  const scrollToTarget = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`home-scroll-hint home-scroll-hint--on-${tone}`}
      onClick={scrollToTarget}
      aria-label="Desplazarse hacia abajo"
    >
      <svg
        className="home-scroll-hint-arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 10l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
