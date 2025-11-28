import type { ButtonHTMLAttributes } from 'react';
import styles from './FilledBtn.module.scss';
import plusDark from '../../assets/icons/ui/plus-dark.svg';
import plusLight from '../../assets/icons/ui/plus-light.svg';
import plusGray from '../../assets/icons/ui/plus-gray.svg';
import plusGrayDark from '../../assets/icons/ui/plus-gray-dark.svg';

interface FilledBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  showIcon?: boolean;
  theme?: 'light' | 'dark';
}

export const FilledBtn = ({
  label = 'Label',
  showIcon = false,
  theme = 'light',
  disabled = false,
  className = '',
  ...props
}: FilledBtnProps) => {
  const btnClass = `${styles.filledBtn} ${styles[theme]} ${className}`;
  
  const getIcon = () => {
    if (disabled) {
      return theme === 'dark' ? plusGrayDark : plusGray;
    }
    return theme === 'light' ? plusLight : plusDark;
  };

  return (
    <button className={btnClass} disabled={disabled} {...props}>
      {showIcon && (
        <img src={getIcon()} alt="" className={styles.icon} />
      )}
      <span className={styles.label}>{label}</span>
    </button>
  );
};