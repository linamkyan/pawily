import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import logo from '@/assets/logo/logo.svg';
import styles from './Header.module.scss';

interface HeaderProps {
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.container}>
        <img src={logo} alt="pawily" className={styles.logo} />
        
        <div className={styles.actions}>
          <span className={styles.userEmail}>{user?.email || 'User'}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;