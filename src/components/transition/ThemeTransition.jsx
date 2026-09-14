import { motion } from 'framer-motion';
import { usePortalTheme } from '../../theme/ThemeContext';
import { getTheme } from '../../theme/themes';
import './transition.css';

// Per-subject transition "signature": a short label + shape style so each
// subject's morph feels distinct even though the mechanism is shared.
const SIGNATURES = {
  chemistry: {
    enterLabel: 'compiling reaction...',
    exitLabel: 'disconnecting...',
    shape: 'shatter',
  },
  maths: {
    enterLabel: 'erasing the board...',
    exitLabel: 'packing the chalk...',
    shape: 'wipe',
  },
  physics: {
    enterLabel: 'turning the page...',
    exitLabel: 'closing the notebook...',
    shape: 'fold',
  },
};

const TRANSITION_VARIANTS = {
  shatter: {
    initial: { clipPath: 'inset(50% 0 50% 0)', opacity: 1 },
    animate: { clipPath: 'inset(0% 0 0% 0)', opacity: 1 },
    exit: { clipPath: 'inset(50% 0 50% 0)', opacity: 0 },
  },
  wipe: {
    initial: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
    exit: { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
  },
  fold: {
    initial: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 1 },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 },
    exit: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
  },
};

export default function ThemeTransition() {
  const { activeSubject, settleSubject, completeExit, transitionDirection } = usePortalTheme();

  const theme = getTheme(activeSubject);
  const signature = SIGNATURES[activeSubject] || SIGNATURES.chemistry;
  const variants = TRANSITION_VARIANTS[signature.shape] || TRANSITION_VARIANTS.shatter;
  const isExiting = transitionDirection === 'exit';

  const handleComplete = () => {
    if (isExiting) {
      completeExit();
    } else {
      settleSubject();
    }
  };

  return (
    <motion.div
      className={`theme-transition theme-transition--${signature.shape}`}
      style={{ background: theme.bg, color: theme.accent }}
      initial={isExiting ? variants.animate : variants.initial}
      animate={isExiting ? variants.exit : variants.animate}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={handleComplete}
    >
      <span className="theme-transition-label" style={{ fontFamily: theme.bodyFont }}>
        {isExiting ? signature.exitLabel : signature.enterLabel}
      </span>
    </motion.div>
  );
}
