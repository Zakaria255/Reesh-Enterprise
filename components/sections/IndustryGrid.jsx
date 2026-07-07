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

  if (variant === 'cards') {
    return (
      <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((ind) => (
          <RevealItem key={ind.name}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-img bg-ink-soft ring-1 ring-line/60 transition-all duration-med ease-reesh hover:-translate-y-1.5 hover:shadow-card-hover">
              {/* Top brand rule draws across on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-[2] h-0.5 origin-left scale-x-0 bg-gradient-brand transition-transform duration-slow ease-reesh group-hover:scale-x-100"
              />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-slow ease-reesh group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.15) 30%, rgba(11,22,34,.9) 100%)' }} />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/90 text-reesh-blue backdrop-blur">
                    <Icon name={ind.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white drop-shadow">{ind.name}</h3>
                </div>
              </div>
              <p className="px-4 py-4 text-[13.5px] leading-relaxed text-slate">{ind.services.join(' · ')}</p>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    );
  }

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
