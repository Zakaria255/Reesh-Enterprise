import Eyebrow from './Eyebrow';
import Reveal, { RevealItem } from '@/components/util/Reveal';

/**
 * SectionHeading — eyebrow + title + optional intro, with scroll-reveal.
 * tone: 'dark' (default, for light bg) | 'light' (for ink bg)
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className = '',
  as = 'h2',
  maxWidth = 'max-w-2xl',
}) {
  const Tag = as;
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'items-start';
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const introColor = tone === 'light' ? 'text-white/70' : 'text-slate';

  return (
    <Reveal
      stagger
      className={`flex flex-col gap-4 ${alignCls} ${align === 'center' ? maxWidth : ''} ${className}`}
    >
      {eyebrow && (
        <RevealItem>
          <Eyebrow tone={tone === 'light' ? 'light' : 'blue'}>{eyebrow}</Eyebrow>
        </RevealItem>
      )}
      <RevealItem
        as={Tag}
        className={`font-display text-h2 ${titleColor} ${align === 'center' ? maxWidth : ''}`}
      >
        {title}
      </RevealItem>
      {intro && (
        <RevealItem as="p" className={`text-body-l ${introColor} ${align === 'center' ? maxWidth : 'max-w-xl'}`}>
          {intro}
        </RevealItem>
      )}
    </Reveal>
  );
}
