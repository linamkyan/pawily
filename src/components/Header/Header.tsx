import logo from '@/assets/logo/logo.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
       <img src={logo} alt="pawly" />
    </header>
  );
};

export default Header;