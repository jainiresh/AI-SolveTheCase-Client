import React from 'react';
import styles from '../styles/Hint.module.css';

interface HintProps {
  puzzle: {
    question: string;
    answer: string;
  };
}

const Hint: React.FC<HintProps> = ({ puzzle }) => {
  return (
    <div className={styles.hintContainer}>
      <p>Hint: The answer is related to sound.</p>
    </div>
  );
};

export default Hint;
