'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/GameLoader.module.css';
import { INVESTIGATING_MESSAGES, LOADING_MESSAGES } from '@/constants/constants';

interface GameLoaderProps{
  loadingText? : string
}

const GameLoader: React.FC<GameLoaderProps> = ({loadingText='Loading...'}) => {


  
  let messages = loadingText == 'Investigate' ? INVESTIGATING_MESSAGES : LOADING_MESSAGES;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages.length]);

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{messages[currentIndex]}</p>
    </div>
  );
};

export default GameLoader;
