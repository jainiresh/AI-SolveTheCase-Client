"use client";
import React, { useState } from 'react';
import { solvePuzzle } from '../Redux/puzzle/puzzleSlice';
import styles from '../styles/Puzzle.module.css'
import { useAppDispatch, useAppSelector} from '@/Redux/store';

interface PuzzleProps {
  puzzle: {
    question: string;
    answer: string;
  };
}

const Puzzle: React.FC<PuzzleProps> = ({ puzzle }) : JSX.Element => {
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isCorrect = input.trim().toLowerCase() === puzzle.answer.toLowerCase();
    dispatch(solvePuzzle(isCorrect));
    setInput('');   
  };

  return (
    <div className={styles.puzzleContainer}>
      <p className={styles.question}>{puzzle.question}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Your answer"
          className={styles.inputText}
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};
export default Puzzle;
