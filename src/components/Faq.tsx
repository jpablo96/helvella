import { FAQ } from '../data/faq'
import ChevronIcon from './icons/ChevronIcon'
import SectionHeader from './SectionHeader'
import './Faq.css'

export default function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title={<span id="faq-title">Todo sobre las flores eternas</span>}
      />
      <div className="faq-list">
        {FAQ.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>
              <h3>{item.question}</h3>
              <ChevronIcon direction="down" size={18} className="faq-chevron" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
