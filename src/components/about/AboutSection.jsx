import AnimatedCard from './AnimatedCard.jsx'
import EducationCard from './EducationCard.jsx'
import SkillsCard from './SkillsCard.jsx'
import AchievementsCard from './AchievementsCard.jsx'
import ExperienceCard from './ExperienceCard.jsx'
import CertificationsCard from './CertificationsCard.jsx'
import LanguagesCard from './LanguagesCard.jsx'
import LocationStatusCard from './LocationStatusCard.jsx'

// Each entry: the card component + how many grid columns it should span on
// large screens (bento-style layout). Stagger delay is derived from index.
const CARDS = [
  { Component: ExperienceCard, span: 'lg:col-span-2' },
  { Component: EducationCard, span: 'lg:col-span-1' },
  { Component: SkillsCard, span: 'lg:col-span-1' },
  { Component: AchievementsCard, span: 'lg:col-span-1' },
  { Component: CertificationsCard, span: 'lg:col-span-1' },
  { Component: LanguagesCard, span: 'lg:col-span-1' },
  { Component: LocationStatusCard, span: 'lg:col-span-1' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-10 border-t border-blueprint-line bg-blueprint-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-widest text-blueprint-amber uppercase mb-2">
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-blueprint-text">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map(({ Component, span }, i) => (
            <AnimatedCard key={Component.name} delay={i * 90} className={span}>
              <Component index={i + 1} />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}