import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSwitcher } from '../../UI/index';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.scss';

export const RegistrationPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const switchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.backgroundPanel}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur. Donec platea facilisis vestibulum sit enim eget nulla. Duis.
          </p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.themeToggle}>
          <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
        </div>

        <RegistrationForm theme={theme} onSwitchToLogin={switchToLogin} />
      </div>
    </div>
  );
};