import React from 'react';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mystery Game</div>
      <div className={styles.actions}>
        <button className={styles.solveButton}>
          Solve with your friend!
        </button>
        <div className={styles.userIcon}>
          <img src="/detective.svg" alt="User Icon" className={styles.iconImage} />
        </div>
      </div>
    </header>
  );
};

export default Header;
