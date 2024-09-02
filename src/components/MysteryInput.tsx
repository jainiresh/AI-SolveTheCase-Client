import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from '../styles/Mysteryinput.module.css';
import { post } from '@/helpers/request';
import { Alert, Card, CardContent, IconButton, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { getRandomStoryEndpoint, testDay } from '@/constants/constants';
import CopyButton from './CopyButton';

interface StoryEntryInput {
  storyInput: string;
  setStoryInput: Function,
  handleSubmit: FormEventHandler<HTMLFormElement>
}

const MysteryInputForm: React.FC<StoryEntryInput> = ({ storyInput, setStoryInput, handleSubmit }) => {

  const hasFetched = useRef(false);
  const [testDay, setTestDay] = useState('Please wait... Loading your content.')

  useEffect(() => {
    if (!hasFetched.current) { 
      hasFetched.current = true
      const fetchTestDay = async () => {
        try {
          const response = await fetch(getRandomStoryEndpoint); // Replace with your actual API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.text()
          console.log('here')
          console.log(data.charAt(0))
          setTestDay(' '+data); 
          hasFetched.current = true; 
        } catch (error) {
          console.error('Error fetching testDay:', error);
          // Handle error appropriately
        }
      };

      fetchTestDay();
    }
  }, [testDay]); // Empty dependency array ensures this runs only once for the initial render

  

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryInput(e.target.value);
  };

  
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Let`s Start Your Creative Story and Investigate</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="storyInput">
              Share the details of your day:
            </label>
            <textarea
              id="storyInput"
              name="storyInput"
              className={styles.textarea}
              value={storyInput}
              onChange={handleChange}
              placeholder="Describe your day, whom you met, what they did, where and when you met them, and any circumstances. Use this space to give a full account."
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <div style={{backgroundColor: 'gray'}}>
        <CopyButton text={testDay}/>
      </div>
    </div>
  );
};

export default MysteryInputForm;
