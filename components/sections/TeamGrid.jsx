import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { team } from '@/lib/content';

// Deterministic initials-avatar (no external images needed for team).
function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
}

export default function TeamGrid() {
  return (
    <section className="bg-white py-section-mobile sm:py-section">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="The people behind the brand."
          intro="A dedicated, multi-disciplinary team that treats your business like our own."
          align="center"
        />
        <Reveal stagger className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {team.map((member, i) => (
            <RevealItem
              key={member.name}
              className="group card-base flex flex-col items-center p-6 text-center transition-all duration-med ease-reesh hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full font-display text-xl font-bold text-white shadow-glow transition-transform duration-med ease-reesh group-hover:scale-105"
                style={{
                  background:
                    i % 2 === 0
                      ? 'linear-gradient(135deg,#009FD0,#006A8B)'
                      : 'linear-gradient(135deg,#16242F,#0B1622)',
                }}
                aria-hidden
              >
                {initials(member.name)}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{member.name}</h3>
              <p className="mt-1 text-sm text-reesh-blue">{member.role}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
