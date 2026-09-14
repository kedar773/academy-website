import { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { THEMES, getTheme } from './themes';

const ThemeContext = createContext(null);

// Stages: 'lobby' (neutral, exploring) -> 'transitioning' (morph playing)
// -> 'subject' (themed micro-landing shown)
export function ThemeProvider({ children }) {
  const [activeSubject, setActiveSubject] = useState(null);
  const [previewSubject, setPreviewSubject] = useState(null);
  const [stage, setStage] = useState('lobby');
  const [transitionDirection, setTransitionDirection] = useState(null); // 'enter' | 'exit'
  const debounceRef = useRef(null);

  const enterSubject = useCallback((subjectId) => {
    setTransitionDirection('enter');
    setStage('transitioning');
    setActiveSubject(subjectId);
    window.location.hash = subjectId;
  }, []);

  const settleSubject = useCallback(() => {
    setTransitionDirection(null);
    setStage('subject');
  }, []);

  const completeExit = useCallback(() => {
    setActiveSubject(null);
    setPreviewSubject(null);
    setTransitionDirection(null);
    setStage('lobby');
    window.location.hash = '';
  }, []);

  const returnToLobby = useCallback(() => {
    setTransitionDirection('exit');
    setStage('transitioning');
    // ThemeTransition will call completeExit via onAnimationComplete
  }, []);

  // Debounced preview to prevent flashing between light/dark themes
  const setDebouncedPreview = useCallback((subjectId) => {
    clearTimeout(debounceRef.current);
    if (subjectId === null) {
      debounceRef.current = setTimeout(() => setPreviewSubject(null), 100);
    } else {
      debounceRef.current = setTimeout(() => setPreviewSubject(subjectId), 60);
    }
  }, []);

  // Hash-based routing: handle initial load and browser back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['chemistry', 'maths', 'physics'].includes(hash)) {
        setActiveSubject(hash);
        setStage('subject');
      } else {
        setActiveSubject(null);
        setPreviewSubject(null);
        setStage('lobby');
      }
    };

    // Only handle initial hash on mount
    const hash = window.location.hash.replace('#', '');
    if (['chemistry', 'maths', 'physics'].includes(hash)) {
      setActiveSubject(hash);
      setStage('subject');
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const theme = useMemo(() => {
    const previewOrActive = activeSubject || previewSubject;
    return getTheme(previewOrActive || 'neutral');
  }, [activeSubject, previewSubject]);

  const value = useMemo(
    () => ({
      stage,
      activeSubject,
      previewSubject,
      transitionDirection,
      setPreviewSubject: setDebouncedPreview,
      enterSubject,
      settleSubject,
      completeExit,
      returnToLobby,
      theme,
      allThemes: THEMES,
    }),
    [stage, activeSubject, previewSubject, transitionDirection, setDebouncedPreview, enterSubject, settleSubject, completeExit, returnToLobby, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function usePortalTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('usePortalTheme must be used within ThemeProvider');
  return ctx;
}
