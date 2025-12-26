import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSwitcher } from '../../UI/index';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.backgroundPanel}>
        <div className={styles.content}>
          <h1 className={styles.title}>Welcome back to Pawily</h1>
          <p className={styles.subtitle}>
            Sign in to continue managing your pet's journey to fame.
          </p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.themeToggle}>
          <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
        </div>

        <LoginForm theme={theme} onSwitchToRegister={handleSwitchToRegister} />
      </div>
    </div>
  );
};