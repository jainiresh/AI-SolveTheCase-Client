"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/StoryThread.module.css';
import { post } from '@/helpers/request';
import GameLoader from './GameLoader';

interface StoryEntry {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface StoryThreadProp {
  author: string;
  content: string;    
}

interface StoryThreadProps {
  entries: StoryEntry[];
}

const StoryThread: React.FC<StoryThreadProps> = ({ entries }) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [investigationInput, setInvestigationInput] = useState<string>('');
  const [storyDescription, setStoryDescription] = useState<string>('');
  const [storyThreads, setStoryThreads] = useState<StoryThreadProp[]>([]);
  
  const getStoryDetails = async () => {
    const response = await post('/story/get', { email: localStorage.getItem('email') });
    const storyLine = response.data['response'];
    setStoryDescription(storyLine.storyDescription);
    setShowLoader(false);
    const entries = storyLine.queries.map((query: string, index: number) => ({
      author: 'Detective',
      content: query
    })).concat(
      storyLine.queryResponses.map((response: string) => ({
        author: 'AI',
        content: response
      }))
    );
    setStoryThreads(entries);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvestigationInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await post('/story/investigate', { email: localStorage.getItem('email'), data: investigationInput });
    if (response.status === 200) {
      setInvestigationInput('');
      const { investigationResult } = response.data;
      setStoryThreads(prevThreads => [
        ...prevThreads, 
        { author: 'Detective', content: investigationResult }
      ]);
    }
  };

  useEffect(() => {
    getStoryDetails();
  }, []);

  return (
    <div>
      {showLoader ? <GameLoader /> :
        <div className={styles.threadContainer}>
          <header className={styles.threadHeader}>
            <h1 className={styles.headerTitle}>Story Context</h1>
            <p className={styles.headerDescription}>
              {storyDescription}
            </p>
          </header>
          <div className={styles.threadContent}>
            {storyThreads.map((entry, index) => (
              <div key={entry.author + index} className={styles.storyEntry}>
                <div className={styles.header}>
                  <span className={styles.author}>{entry.author}</span>
                  <span className={styles.image}>
                    <button className={styles.imageButton} onClick={() => alert('Image view is not implemented yet.')}>
                      View Image
                    </button>
                  </span>
                </div>
                <div className={styles.content}>
                  {entry.content}
                </div>
              </div>
            ))}
          </div>
          <form className={styles.investigationForm} onSubmit={handleSubmit}>
            <textarea
              className={styles.investigationInput}
              placeholder="Enter your thoughts for the next investigation..."
              value={investigationInput}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      }
    </div>
  );
};

export default StoryThread;
