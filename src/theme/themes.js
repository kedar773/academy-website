// Central theme registry. Every visual surface (scene colors, transition
// style, micro-landing chrome) reads from these tokens so switching themes
// is a data change, not a rewrite.

export const THEMES = {
  neutral: {
    id: 'neutral',
    label: "Kedar's Academy",
    bg: '#0F0F10',
    bgAlt: '#161616',
    accent: '#F2A623',
    accentSoft: 'rgba(242, 166, 35, 0.18)',
    text: '#F5F3EC',
    textMuted: '#A8A6A0',
    displayFont: "'Permanent Marker', cursive",
    bodyFont: "'Space Grotesk', sans-serif",
  },
  chemistry: {
    id: 'chemistry',
    label: 'Chemistry',
    tagline: 'Reactions, rewired.',
    bg: '#0A0A12',
    bgAlt: '#10111c',
    accent: '#00F0FF',
    accent2: '#FF2E63',
    accentSoft: 'rgba(0, 240, 255, 0.16)',
    text: '#E8FBFF',
    textMuted: '#7C90A8',
    displayFont: "'Share Tech Mono', monospace",
    bodyFont: "'Space Grotesk', sans-serif",
    grid: true,
    scanlines: true,
  },
  maths: {
    id: 'maths',
    label: 'Maths',
    tagline: 'Every proof, in the open.',
    bg: '#F7F6F1',
    bgAlt: '#FDFDF8',
    accent: '#2E5EAA',
    accent2: '#D8232A',
    accentSoft: 'rgba(46, 94, 170, 0.12)',
    text: '#1E2430',
    textMuted: '#6B7280',
    displayFont: "'Kalam', cursive",
    bodyFont: "'Space Grotesk', sans-serif",
    chalkTexture: true,
  },
  physics: {
    id: 'physics',
    label: 'Physics',
    tagline: 'Motion you can annotate.',
    bg: '#F1E8D0',
    bgAlt: '#F6EFE0',
    accent: '#1E4620',
    accent2: '#5B3A29',
    accentSoft: 'rgba(30, 70, 32, 0.12)',
    text: '#2B2419',
    textMuted: '#7A6E56',
    displayFont: "'Caveat', cursive",
    bodyFont: "'Space Grotesk', sans-serif",
    paperTexture: true,
  },
};

export const THEME_ORDER = ['chemistry', 'maths', 'physics'];

export function getTheme(id) {
  return THEMES[id] || THEMES.neutral;
}
