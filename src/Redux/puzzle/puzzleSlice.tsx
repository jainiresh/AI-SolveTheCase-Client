// src/redux/puzzleSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Puzzle {
  id: number;
  question: string;
  answer: string;
}

interface PuzzleState {
  puzzles: Puzzle[];
  currentPuzzleIndex: number;
  progress: number;
  showHint: boolean;
  completed: boolean;
}

const initialState: PuzzleState = {
  puzzles: [
    { id: 1, question: "I speak without a mouth and hear without ears. What am I?", answer: "Echo" },
    { id: 2, question: "What has keys but can't open locks?", answer: "Piano" },
  ],
  currentPuzzleIndex: 0,
  progress: 0,
  showHint: false,
  completed: false,
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    solvePuzzle: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.progress += 1;
        if (state.currentPuzzleIndex + 1 < state.puzzles.length) {
          state.currentPuzzleIndex += 1;
        } else {
          state.completed = true;
        }
      }
    },
    toggleHint: (state) => {
      state.showHint = !state.showHint;
    },
    resetGame: (state) => {
      state.currentPuzzleIndex = 0;
      state.progress = 0;
      state.showHint = false;
      state.completed = false;
    },
  },
});

export const { solvePuzzle, toggleHint, resetGame } = puzzleSlice.actions;
export default puzzleSlice.reducer;
