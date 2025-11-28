import type { ButtonHTMLAttributes } from 'react';
import styles from './TextBtn.module.scss';
import plusLight from '../../assets/icons/ui/plus-dark-purple.svg';
import plusDark from '../../assets/icons/ui/plus-purple.svg';
import plusGray from '../../assets/icons/ui/plus-gray.svg';
import plusGrayDark from '../../assets/icons/ui/plus-gray-dark.svg';

interface TextBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  showIcon?: boolean;
  theme?: 'light' | 'dark';
}

export const TextBtn = ({
  label = 'Label',
  showIcon = false,
  theme = 'light',
  disabled = false,
  className = '',
  ...props
}: TextBtnProps) => {
  const btnClass = `${styles.textBtn} ${styles[theme]} ${className}`;
  
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