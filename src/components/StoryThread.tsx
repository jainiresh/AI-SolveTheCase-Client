"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/StoryThread.module.css';
import { post } from '@/helpers/request';
import GameLoader from './GameLoader';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Button, CardMedia, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FullScreenDialog from './FullScreenDialog';
import Image from './Image';

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
  firstTime: boolean;
}

const StoryThread: React.FC<StoryThreadProps> = ({ entries, firstTime }) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [investigationInput, setInvestigationInput] = useState<string>('');
  const [storyDescription, setStoryDescription] = useState<string>('');
  const [storyThreads, setStoryThreads] = useState<StoryThreadProp[]>([]);
  const [openStoryDialog, setOpenStoryDialog] = useState<boolean>(false);
  const [storyMainPictureUrl, setStoryMainPictureUrl] = useState<string>('');
  const [readySubmit, setReadySubmit] = React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState<string>('Story context');
  const [dayInput, setDayInput] = React.useState<string>('');
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const getStoryDetails = async () => {
    const response = await post('/story/get', { email: localStorage.getItem('email') });
    const storyLine = response.data['response'];
    setStoryDescription(storyLine.storyDescription);
    setStoryMainPictureUrl(storyLine.storyMainPicture);
    setDayInput(storyLine.input)

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

  const handleInvestigation = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    const response = await post('/story/investigate', { email: localStorage.getItem('email'), data: investigationInput });
    
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false)
    },3000);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    const response = await post('/story/submit', { email: localStorage.getItem('email'), data: investigationInput });
    setShowLoader(false);
    if (response.status === 200) {
      setInvestigationInput('');
      const { result:investigationResult} = response.data;
      setStoryDescription(investigationResult);
      setStoryMainPictureUrl('https://img.freepik.com/premium-vector/policeman-catch-thief-with-money-vector-illustration-cartoon-style_106788-2662.jpg?w=1500')
      setDialogTitle('Case results - Case closed.');
      setOpenStoryDialog(true);
    }
  };

  useEffect(() => {
    getStoryDetails();
    if(firstTime){
      setOpenStoryDialog(true);
    }
  }, []);

  const openDialog= () =>{
    setOpenStoryDialog(true);
  }

  return (
    <div>
      {<FullScreenDialog open={openStoryDialog} setOpen={setOpenStoryDialog} storyDescription={storyDescription} storyMainPictureUrl={storyMainPictureUrl} title={dialogTitle} dayInput={dayInput}/>}
      {showLoader ? <GameLoader loadingText='Investigate'/> :
        <div className={styles.threadContainer}>
          <div style={{display:'flex', flexDirection:'row'}}>
          <Button onClick={() => {openDialog();}}><Typography color={'#da8b57'} >Click here to View Story Context / Your Day</Typography></Button>
          </div>
          <div className={styles.threadContent}>
      {storyThreads.map((entry, index) => (
        <Accordion key={index} style={{ backgroundColor: 'transparent' }} defaultExpanded={index+1 == storyThreads.length}>
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
      <Button  disabled={storyThreads.length == 0} onClick={() => setReadySubmit(prevState => !prevState)}><Typography  >{!readySubmit ? storyThreads.length == 0 ? <>
      {/* <span style={{color:'gray'}}>No investigations made yet</span>
      <br /> */}
     
      <span style={{color:'gray'}}>Here are a few samples to help you form your investigation.</span></> : `Ready with your answer ? Click here to submit` :`Click here to Investigate more...` }</Typography></Button>
      {storyThreads.length != 0 && 
      <ul className={styles.list}>
      <li><strong>The guy i met at the park, carried a large suitcase, and seemed suspicious</strong></li>
      <li><strong>My friend &lt;Person`s name&gt; gave me a suspicious call, what was it about ?</strong></li>
      <li><strong>The guy at the reception, had strange documents under his chair, what was it about ?</strong></li>
      <li><strong>My trainer &lt;Person name&gt; seemed to be talking about a robbery to someone on the phone, what was it about ?</strong></li>
      </ul>}
    </div>
          <form className={styles.investigationForm} onSubmit={!readySubmit ? handleInvestigation: handleSubmit}>
            <textarea
              
              className={styles.investigationInput}
              placeholder={readySubmit ? "Tell me who do you think the culprit is, along with a short reason.": "Enter your thoughts for the next investigation..."}
              value={investigationInput}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" style={{backgroundColor:readySubmit ? 'green': ''}} className={styles.submitButton}><Typography variant='h5'>{readySubmit ? "Submit Answer" : "Investigate"}</Typography></Button>
          </form>
        </div>
      }
      { showAlert &&<Alert style={{position:'fixed', bottom:'20px', left:'45vw', zIndex: 1000}}  variant="filled" severity="success">
  Investigation completed and Email thread sent !
</Alert>}
    </div>
  );
};

export default StoryThread;

