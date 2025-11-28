import type { ButtonHTMLAttributes } from 'react';
import styles from './ThemeSwitcher.module.scss';
import sunIcon from '../../assets/icons/sun.svg';
import moonIcon from '../../assets/icons/moon.svg';

interface ThemeSwitcherProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeSwitcher = ({
  theme,
  onToggle,
  className = '',
  ...props
}: ThemeSwitcherProps) => {
  const switcherClass = `${styles.themeSwitcher} ${styles[theme]} ${className}`;
  const icon = theme === 'light' ? moonIcon : sunIcon;

  return (
    <button 
      className={switcherClass} 
      onClick={onToggle}
      aria-label="Toggle theme"
      {...props}
    >
      <span className={`${styles.track} ${styles[theme]}`}>
        <span className={`${styles.thumb} ${styles[theme]}`}>
          <img src={icon} alt="" className={styles.icon} />
        </span>
      </span>
    </button>
  );
};