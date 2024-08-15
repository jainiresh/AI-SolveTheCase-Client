import React from 'react';
import styles from '../styles/GameLoader.module.css';

const GameLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Loading...</p>
    </div>
  );
};

export default GameLoader;
