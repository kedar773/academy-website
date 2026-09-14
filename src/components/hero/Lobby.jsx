import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../scene/HeroScene';
import GaneshModal from '../ganesh/GaneshModal';
import { usePortalTheme } from '../../theme/ThemeContext';
import { THEMES } from '../../theme/themes';
import ganeshImg from '../../assets/ganesh.jpg';
import './lobby.css';

const LABEL_SLOTS = [
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'maths', label: 'Maths' },
  { id: 'physics', label: 'Physics' },
];

export default function Lobby() {
  const { enterSubject, setPreviewSubject, previewSubject } = usePortalTheme();
  const [showGaneshModal, setShowGaneshModal] = useState(false);

  return (
    <motion.div
      className="lobby"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cute Lord Ganesh Top-Left Icon Button */}
      <button
        className="ganesh-icon-btn"
        onClick={() => setShowGaneshModal(true)}
        aria-label="Lord Ganesh Gayatri Mantra"
        title="श्री गणेश | Gayatri Mantra"
      >
        <img src={ganeshImg} alt="Cute Lord Ganesh" className="ganesh-icon-img" />
      </button>

      <GaneshModal
        isOpen={showGaneshModal}
        onClose={() => setShowGaneshModal(false)}
      />
      <motion.div
        className="lobby-intro"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="lobby-title">Kedar's Academy</h1>
        <p className="lobby-subtitle">
          Chemistry lecturer &amp; builder of three worlds for Class 11 &amp; 12 &mdash;
          pick your subject to step in.
        </p>
      </motion.div>

      <HeroScene />

      <div className="lobby-labels" role="group" aria-label="Subject selection">
        {LABEL_SLOTS.map(({ id, label }) => (
          <button
            key={id}
            className={`lobby-label ${previewSubject === id ? 'lobby-label--active' : ''}`}
            style={{
              color: previewSubject === id ? THEMES[id].accent : undefined,
              fontFamily: THEMES[id].displayFont,
            }}
            onMouseEnter={() => setPreviewSubject(id)}
            onMouseLeave={() => setPreviewSubject(null)}
            onFocus={() => setPreviewSubject(id)}
            onBlur={() => setPreviewSubject(null)}
            onClick={() => enterSubject(id)}
            aria-label={`Enter ${label} portal`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="lobby-hint">hover to preview · tap to enter</p>

      <motion.p
        className="lobby-coming-soon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Biology &amp; Computer Science — coming soon
      </motion.p>

      <motion.footer
        className="lobby-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <p className="lobby-footer-heading">Our Centers</p>
        <div className="lobby-addresses">
          <address className="lobby-address">
            <span className="lobby-address-icon">📍</span>
            Arundhati Vihar, Jagasera, Near Paikarapur, Bhubaneswar, Khordha &mdash; 752054
          </address>
          <address className="lobby-address">
            <span className="lobby-address-icon">📍</span>
            Lane 1, Jagganath Vihar, Baramunda, Near Fire Station, Bhubaneswar &mdash; 751003
          </address>
        </div>
      </motion.footer>
    </motion.div>
  );
}
