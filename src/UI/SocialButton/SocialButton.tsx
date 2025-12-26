import React from 'react';
import appleImg from '../../assets/icons/apple.svg';
import googleImg from '../../assets/icons/google.svg';
import styles from './SocialButton.module.scss';

interface SocialButtonProps {
  provider: 'google' | 'apple';
  onClick: () => void;
  theme?: 'light' | 'dark';
  disabled?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  theme = 'light',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.socialButton} ${styles[theme]} ${styles[provider]}`}
      type="button"
    >
      <span className={styles.icon}>
        <img 
          src={provider === 'google' ? googleImg : appleImg} 
          alt={provider} 
          width="20" 
          height="20"
        />
      </span>
      <span className={styles.label}>
        {provider === 'google' ? 'Google' : 'Apple'}
      </span>
    </button>
  );
};