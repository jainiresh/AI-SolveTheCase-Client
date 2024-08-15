import React from 'react';
import styles from '../styles/ProgressTracker.module.css';

interface ProgressTrackerProps {
  progress: number;
  total: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, total }) => {
  return (
    <div className={styles.progressContainer}>
      <p>Progress: {progress} / {total} puzzles solved</p>
    </div>
  );
};

export default ProgressTracker;
