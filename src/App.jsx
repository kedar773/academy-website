import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, usePortalTheme } from './theme/ThemeContext';
import Lobby from './components/hero/Lobby';
import ThemeTransition from './components/transition/ThemeTransition';
import SubjectLanding from './components/landing/SubjectLanding';
import './App.css';

function Stage() {
  const { stage, theme } = usePortalTheme();

  const cssVars = {
    '--bg': theme.bg,
    '--bg-alt': theme.bgAlt,
    '--accent': theme.accent,
    '--accent-soft': theme.accentSoft,
    '--text': theme.text,
    '--text-muted': theme.textMuted,
    '--display-font': theme.displayFont,
    '--body-font': theme.bodyFont,
  };

  return (
    <main className="app-root" style={cssVars} role="main">
      <AnimatePresence mode="wait">
        {stage === 'lobby' && <Lobby key="lobby" />}
        {stage === 'transitioning' && <ThemeTransition key="transition" />}
        {stage === 'subject' && <SubjectLanding key="subject" />}
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Stage />
    </ThemeProvider>
  );
}
