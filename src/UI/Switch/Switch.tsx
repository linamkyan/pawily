import type { InputHTMLAttributes } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme?: 'light' | 'dark';
}

export const Switch = ({
  checked,
  onChange,
  theme = 'light',
  disabled = false,
  className = '',
  ...props
}: SwitchProps) => {
  const switchClass = `${styles.switch} ${styles[theme]} ${className}`;

  return (
    <label className={switchClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.input}
        {...props}
      />
      <span className={`${styles.track} ${checked ? styles.checked : ''}`}>
        <span className={styles.thumb}></span>
      </span>
    </label>
  );
};