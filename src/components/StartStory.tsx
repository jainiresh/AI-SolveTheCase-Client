'use client';
import React, { FormEventHandler, useState } from 'react';
import styles from '../styles/StartStory.module.css';
import Instructions from './Instructions';
import {post} from '../helpers/request'
import MysteryInputForm from './MysteryInput';
import { testDay } from '@/constants/constants';

interface StoryEntryInput {
    storyInput: string;
    setStoryInput: Function,
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const StartStoryHome: React.FC<StoryEntryInput> = ({storyInput,setStoryInput,handleSubmit}) => {
const [storyContext, setStoryContext] = useState<string>('empty')

  const handleUserStoryInput = (inputStoryContext: string) => {
    console.log(inputStoryContext)
    setStoryContext(inputStoryContext);
  };
  console.log(storyContext)
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.content}>
      {storyContext=='empty' && <Instructions handleUserStoryInput ={handleUserStoryInput}/>}
      {storyContext=='ownStory' && <MysteryInputForm storyInput={ storyInput} setStoryInput={setStoryInput} handleSubmit={handleSubmit}/>}
      {storyContext=='aiStory' && <MysteryInputForm storyInput={ testDay} setStoryInput={setStoryInput} handleSubmit={handleSubmit}/>}
    </div>
    </div>
  );
};

export default StartStoryHome;