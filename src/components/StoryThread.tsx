"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/StoryThread.module.css';
import { post } from '@/helpers/request';
import GameLoader from './GameLoader';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardMedia } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { style } from '@mui/system';
import Image from 'next/image';

interface StoryEntry {
  id: number;
  author1: string;
  author2: string;
  query: string;
  response: string;
  timestamp: string;
}

interface StoryThreadProp {
  author1: string;
  author2: string;
  query: string;
  response: string;
  imageUrl: string
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

    const entries = [];
    const length = storyLine.queries.length;

    for (let i = 0; i < length; i++) {
      entries.push({
        author1: 'Investigation query',
        query: storyLine.queries[i],
        author2: 'Response',
        response: storyLine.queryResponses[i],
        imageUrl: storyLine.investigationImages[i]
      })
    }

    setStoryThreads(entries);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvestigationInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    const response = await post('/story/investigate', { email: localStorage.getItem('email'), data: investigationInput });
    setShowLoader(false);
    if (response.status === 200) {
      setInvestigationInput('');
      const { investigationResult, imageUrl } = response.data;
      setStoryThreads(prevThreads => [
        ...prevThreads,
        {
          author1: 'Investigation query', 
          query: investigationInput,
          author2: 'Response',
           response: investigationResult, 
           imageUrl: imageUrl
        }
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
        <Accordion key={index} style={{ backgroundColor: 'transparent' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <span className={styles.author}>{`${entry.author1} ${index+1}`}</span>
          </AccordionSummary>
          <AccordionDetails className={styles.storyEntry}>
              <span className={styles.content}>{entry.query}</span>
              <hr /><br />
              <div >
                <span className={styles.author}>{entry.author2}</span><br />
                <div className={styles.image}>
                  <Image src={`${entry.imageUrl}500x500/`} width={'700'} height={'500'} alt='image'/>
                </div>
              </div>
              <div className={styles.content}>
                {entry.response}
              </div>
          </AccordionDetails>
        </Accordion>
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
