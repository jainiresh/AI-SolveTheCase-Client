import React, { FormEventHandler, useState } from 'react';
import styles from '../styles/Mysteryinput.module.css';
import { post } from '@/helpers/request';
import { Alert, Card, CardContent, IconButton, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { testDay } from '@/constants/constants';

interface StoryEntryInput {
  storyInput: string;
  setStoryInput: Function,
  handleSubmit: FormEventHandler<HTMLFormElement>
}

const MysteryInputForm: React.FC<StoryEntryInput> = ({ storyInput, setStoryInput, handleSubmit }) => {

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryInput(e.target.value);
  };

  const copyText = async () => {
    setShowAlert(true);
    await navigator.clipboard.writeText(testDay);
    setTimeout(()=>{
      setShowAlert(false);
    },3000)
  }
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
      <div>
        {/* <Card style={{ marginTop: '5rem', backgroundColor:'#ee8641', cursor:'pointer' }}> */}
          {/* <CardContent onClick={copyText}> */}
            {/* <Typography style={{fontSize:'24px'}}>Too tired to type out your day ? Try the AI generated content of a day.</Typography> */}
            <Typography  onClick={copyText} className={styles.blinkingText} style={{ marginLeft:'1rem', fontSize:'20px', cursor:'pointer', fontWeight:'bolder', color:'#ee8641', marginTop: '3rem' }}> Click here to copy a sample AI generated content
              <IconButton >
                <ContentCopy style={{color:'#ee8641'}}/>
              </IconButton>
            </Typography>
          {/* </CardContent> */}
        {/* </Card> */}
      </div>
      {showAlert && <Alert style={{position:'fixed', bottom:'40px', left:'45vw', zIndex: 1000, scale:'1.6'}} variant="filled" severity="success">
        Message copied successfully !
      </Alert>}
    </div>
  );
};

export default MysteryInputForm;
