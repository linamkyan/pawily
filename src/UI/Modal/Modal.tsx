import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'error' | 'success' | 'info';
  theme: 'light' | 'dark';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  theme
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[theme]} ${styles[type]}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.iconWrapper}>
          {type === 'error' && (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 14V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="32" r="1.5" fill="currentColor"/>
            </svg>
          )}
          {type === 'success' && (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 24L22 30L32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'info' && (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 22V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          )}
        </div>

        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>

        <button className={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};
