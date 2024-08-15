import React, { FormEventHandler, useState } from 'react';
import styles from '../styles/Mysteryinput.module.css';
import { post } from '@/helpers/request';

interface StoryEntryInput {
    storyInput: string;
    setStoryInput: Function,
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const MysteryInputForm: React.FC<StoryEntryInput> = ({storyInput,setStoryInput, handleSubmit}) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryInput(e.target.value);
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Let's Start Your Creative Story and Investigate</h2>
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
    </div>
  );
};

export default MysteryInputForm;
