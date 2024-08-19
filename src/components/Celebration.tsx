import React from 'react';
import styles from '../styles/Celebration.module.css';

const Celebration: React.FC = () => {
  return (
    <div className={styles.celebrationContainer}>
      <h2 className={styles.headingTwo}>Congratulations! You`ve escaped the inbox!</h2>
      <p className={styles.paragraph}>You solved all the puzzles. Well done!</p>
    </div>
  );
};

export default Celebration;
