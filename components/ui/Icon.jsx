// Compact line-icon set (stroke = currentColor). Used across industries & features.
const paths = {
  hotel: 'M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 21V9h3a1 1 0 0 1 1 1v11M8 8h2M8 12h2M8 16h2',
  utensils: 'M4 3v7a2 2 0 0 0 2 2v9M8 3v9M6 3v4M18 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9',
  bag: 'M6 8V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v0m6 3H6l-.7 9.3A1.5 1.5 0 0 0 6.8 21h10.4a1.5 1.5 0 0 0 1.5-1.7L18 8Z',
  health: 'M12 21s-7-4.35-9.5-8.5C.9 9.7 2 6 5.5 6 7.5 6 9 7.5 12 10c3-2.5 4.5-4 6.5-4C22 6 23.1 9.7 21.5 12.5 19 16.65 12 21 12 21Z',
  building: 'M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M15 21V9h4a1 1 0 0 1 1 1v11M7 7h2M7 11h2M7 15h2M3 21h18',
  chart: 'M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20V6',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20',
  chip: 'M7 7h10v10H7zM4 9V7a3 3 0 0 1 3-3h2M15 4h2a3 3 0 0 1 3 3v2M20 15v2a3 3 0 0 1-3 3h-2M9 20H7a3 3 0 0 1-3-3v-2',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z',
  briefcase: 'M3 8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18',
};

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.6 }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
