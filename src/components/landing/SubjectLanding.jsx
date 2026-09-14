import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortalTheme } from '../../theme/ThemeContext';
import { getTheme } from '../../theme/themes';
import './subject-landing.css';

const LINKS = {
  chemistry: {
    web: 'https://kedar773.github.io/cbse-chemistry-alt/',
    app: 'https://github.com/kedar773/chemistry-app/releases/download/v1.0.0/app-release.apk',
  },
  maths: {
    web: 'https://kedar773.github.io/cbse-maths/',
    app: 'https://github.com/kedar773/maths-app/releases/latest/download/kedars-maths-engine.apk',
  },
  physics: {
    web: 'https://kedar773.github.io/cbse-physics/',
    app: 'https://github.com/kedar773/physics-app/releases/latest/download/kedars-physics-engine.apk',
  },
};

const SUBJECT_FEATURES = {
  chemistry: [
    { icon: '⚗️', title: 'Interactive Notes', desc: 'Chapter-wise theory with diagrams' },
    { icon: '📝', title: 'PYQ Bank', desc: 'Past year questions with solutions' },
    { icon: '🧪', title: 'Quick Revision', desc: 'Formula sheets & key concepts' },
  ],
  maths: [
    { icon: '📐', title: 'Worked Examples', desc: 'Step-by-step problem solving' },
    { icon: '📊', title: 'Practice Sets', desc: 'Topic-wise question banks' },
    { icon: '📖', title: 'NCERT Solutions', desc: 'Complete textbook solutions' },
  ],
  physics: [
    { icon: '🔬', title: 'Concept Notes', desc: 'Clear explanations with diagrams' },
    { icon: '⚡', title: 'Numericals', desc: 'Solved problems by difficulty' },
    { icon: '🎯', title: 'Quick Formulas', desc: 'All formulas at a glance' },
  ],
};

// Pick white or black text based on background luminance for contrast
function contrastText(hex) {
  if (!hex || hex.charAt(0) !== '#') return '#ffffff';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#0a0a0a' : '#ffffff';
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function SubjectLanding() {
  const { activeSubject, returnToLobby } = usePortalTheme();
  const theme = getTheme(activeSubject);
  const links = LINKS[activeSubject] || {};
  const features = SUBJECT_FEATURES[activeSubject] || [];
  const btnTextColor = contrastText(theme.accent);

  // Escape key to return to lobby
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') returnToLobby();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [returnToLobby]);

  return (
    <motion.div
      className={`subject-landing subject-landing--${activeSubject}`}
      style={{
        background: theme.bg,
        color: theme.text,
        '--accent': theme.accent,
        '--accent2': theme.accent2 || theme.accent,
        '--btn-primary-text': btnTextColor,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="subject-back"
        onClick={returnToLobby}
        style={{ color: theme.textMuted }}
        aria-label="Back to subject selection"
      >
        &larr; back
      </button>

      <motion.div className="subject-hero" variants={stagger} initial="initial" animate="animate">
        <motion.h2
          className="subject-name"
          style={{ fontFamily: theme.displayFont, color: theme.accent }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          {theme.label}
        </motion.h2>

        <motion.p
          className="subject-tagline"
          style={{ fontFamily: theme.bodyFont, color: theme.textMuted }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          {theme.tagline}
        </motion.p>

        <motion.div className="subject-actions" variants={fadeUp} transition={{ duration: 0.5 }}>
          <a
            className="subject-btn subject-btn--primary"
            href={links.web}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: theme.bodyFont }}
            aria-label={`Launch ${theme.label} web app`}
          >
            🌐 Launch web app
          </a>
          <a
            className="subject-btn subject-btn--secondary"
            href={links.app}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: theme.bodyFont }}
            aria-label={`Download ${theme.label} Android app`}
          >
            📱 Get the app
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="subject-features"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="feature-card"
            style={{
              background: theme.bgAlt,
              borderColor: theme.accentSoft,
            }}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title" style={{ color: theme.accent }}>
              {feature.title}
            </h3>
            <p className="feature-desc" style={{ color: theme.textMuted }}>
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="subject-footer"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Class 11 &amp; 12 · CBSE · Free &amp; open source
      </motion.p>
    </motion.div>
  );
}
