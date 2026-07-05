import Image from 'next/image';

/**
 * SmartImage — next/image with consistent DS treatment.
 * treatment: 'rounded' | 'scrim' | 'duotone' | 'plain'
 */
export default function SmartImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  treatment = 'rounded',
  priority = false,
  className = '',
  imgClassName = '',
  scrimStrength = 0.7,
}) {
  const rounded = treatment !== 'plain' ? 'rounded-img' : '';
  const shadow = treatment === 'rounded' ? 'shadow-card' : '';

  return (
    <div className={`relative overflow-hidden ${rounded} ${shadow} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover ${
          treatment === 'duotone' ? 'saturate-[.85]' : ''
        } ${imgClassName}`}
      />
      {treatment === 'duotone' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ background: 'linear-gradient(135deg, rgba(0,159,208,.32), rgba(11,22,34,.28))' }}
        />
      )}
      {treatment === 'scrim' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(11,22,34,${scrimStrength * 0.35}) 0%, rgba(11,22,34,${scrimStrength}) 100%)`,
          }}
        />
      )}
    </div>
  );
}
