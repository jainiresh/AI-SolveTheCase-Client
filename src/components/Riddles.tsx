"use client";
import React from 'react';
import { useAppDispatch, useAppSelector } from "../Redux/store";
import {  toggleHint } from '../Redux/puzzle/puzzleSlice';
import Puzzle from '../components/Puzzle';
import ProgressTracker from '../components/ProgressTracker';
import Hint from '../components/Hint';
import Celebration from '../components/Celebration';
import styles from '../styles/EscapeRoom.module.css';

export const Riddles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { puzzles, currentPuzzleIndex, progress, showHint, completed } = useAppSelector((state) => state.puzzle);
  console.log(puzzles)

  const handleHint = () => {
    dispatch(toggleHint());
  };

  return (
    <div className={styles.escapeRoomContainer}>
      {!completed ? (
        <>
          <ProgressTracker progress={progress} total={puzzles.length} />
          <Puzzle puzzle={puzzles[currentPuzzleIndex]} />
          <button className={styles.hintButton} onClick={handleHint}>Need a Hint?</button>
          {showHint && <Hint puzzle={puzzles[currentPuzzleIndex]} />}
        </>
      ) : (
        <Celebration />
      )}
    </div>
  );
};

