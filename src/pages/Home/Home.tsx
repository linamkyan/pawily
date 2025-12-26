import React from 'react';
import Header from '../../components/Header/Header';
import { useAppSelector } from '../../store/hooks';
import styles from './Home.module.scss';

interface HomeProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Home: React.FC<HomeProps> = ({ theme, onToggleTheme: _onToggleTheme }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={`${styles.homePage} ${styles[theme]}`}>
      <Header theme={theme} />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Pawily!</h1>
          <p className={styles.subtitle}>
            You're successfully logged in as {user?.email}
          </p>
          
          <div className={styles.content}>
            <div className={styles.card}>
              <h2>Getting Started</h2>
              <p>Start managing your pet's journey to fame.</p>
            </div>
            
            <div className={styles.card}>
              <h2>Your Profile</h2>
              <p>Complete your profile to get the most out of Pawily.</p>
            </div>
            
            <div className={styles.card}>
              <h2>Explore Features</h2>
              <p>Discover all the amazing features we have to offer.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};