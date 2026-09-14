import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ganeshImg from '../../assets/ganesh.jpg';
import './ganesh-modal.css';

export default function GaneshModal({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ganesh-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="ganesh-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              className="ganesh-modal-close"
              onClick={onClose}
              aria-label="Close popup"
            >
              ✕
            </button>

            {/* Sacred Om & Heading */}
            <div className="ganesh-modal-header">
              <span className="ganesh-om-symbol">ॐ</span>
              <h2 className="ganesh-modal-title">श्री गणेशाय नमः</h2>
              <span className="ganesh-modal-sub">Ganesh Gayatri Mantra</span>
            </div>

            {/* Ganesh Image */}
            <div className="ganesh-image-container">
              <img
                src={ganeshImg}
                alt="Cute Lord Ganesh"
                className="ganesh-image"
              />
            </div>

            {/* Mantra in Hindi / Sanskrit */}
            <div className="ganesh-mantra-box">
              <p className="ganesh-mantra-hindi">
                ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि<br />
                तन्नो दन्तिः प्रचोदयात्॥
              </p>
            </div>

            {/* Mantra in English Transliteration */}
            <div className="ganesh-mantra-english-box">
              <p className="ganesh-mantra-english">
                &ldquo;Om Ekadantaya Vidmahe, Vakratundaya Dhimahi,<br />
                Tanno Dantih Prachodayat&rdquo;
              </p>
              <p className="ganesh-mantra-meaning">
                May the divine Lord with single tusk and curved trunk inspire our intellect and guide us with wisdom and success.
              </p>
            </div>

            {/* Footer blessing */}
            <button className="ganesh-pranam-btn" onClick={onClose}>
              🙏 जय श्री गणेश (Close)
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
