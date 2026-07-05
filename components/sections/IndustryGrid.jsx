import Image from 'next/image';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { industries } from '@/lib/content';

/**
 * IndustryGrid — two modes.
 * variant 'chips' → compact preview (Home). variant 'blocks' → full detail (Industries page).
 */
export default function IndustryGrid({ variant = 'blocks', limit }) {
  const items = limit ? industries.slice(0, limit) : industries;

  if (variant === 'chips') {
    return (
      <Reveal stagger className="flex flex-wrap gap-3">
        {items.map((ind) => (
          <RevealItem
            key={ind.name}
            className="group flex items-center gap-2.5 rounded-pill border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-[0_2px_10px_rgba(11,22,34,.05)] transition-all duration-med ease-reesh hover:-translate-y-0.5 hover:border-reesh-blue/40 hover:shadow-card"
          >
            <span className="text-reesh-blue transition-transform duration-med group-hover:scale-110">
              <Icon name={ind.icon} className="h-4 w-4" />
            </span>
            {ind.name}
          </RevealItem>
        ))}
      </Reveal>
    );
  }

  return (
    <Reveal stagger className="grid gap-6 sm:grid-cols-2">
      {items.map((ind) => (
        <RevealItem
          key={ind.name}
          className="group card-base flex flex-col overflow-hidden transition-all duration-med ease-reesh hover:-translate-y-1.5 hover:shadow-card-hover"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={ind.image}
              alt={ind.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-slow ease-reesh group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.05) 40%, rgba(11,22,34,.6))' }} />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-reesh-blue backdrop-blur">
                <Icon name={ind.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-h3 text-white drop-shadow">{ind.name}</h3>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-eyebrow uppercase text-gray">What we deliver</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ind.services.map((s) => (
                <li key={s} className="rounded-pill bg-mist px-3 py-1 text-[13px] font-medium text-slate">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}
