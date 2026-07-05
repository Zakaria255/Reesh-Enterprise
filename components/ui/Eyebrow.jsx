export default function Eyebrow({ children, className = '', tone = 'blue' }) {
  const dot = tone === 'light' ? 'bg-white/70' : 'bg-reesh-blue';
  const text = tone === 'light' ? 'text-white/80' : 'text-reesh-blue';
  return (
    <span className={`eyebrow ${text} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {children}
    </span>
  );
}
