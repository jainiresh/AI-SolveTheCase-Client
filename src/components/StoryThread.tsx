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
import { ExpandCircleDown } from '@mui/icons-material';

interface StoryEntry {
  id: number;
  author1: string;
  query: string;
  timestamp: string;
}

interface StoryThreadProp {
  author1: string;
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
  const [introGiven, setIntroGiven] = React.useState<boolean>(false);
  

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
    <div className={styles.pageContainer}>
      {<FullScreenDialog introGiven={introGiven} open={!introGiven} setOpen={setOpenStoryDialog} storyDescription={storyDescription} storyMainPictureUrl={storyMainPictureUrl} title={dialogTitle} dayInput={dayInput} setIntroGiven={setIntroGiven}/>}
      {<FullScreenDialog open={introGiven && openStoryDialog} setOpen={setOpenStoryDialog} storyDescription={storyDescription} storyMainPictureUrl={storyMainPictureUrl} title={dialogTitle} dayInput={dayInput} introGiven={introGiven} setIntroGiven={setIntroGiven}/>}
      {showLoader ? <GameLoader loadingText='Investigate'/> :
        <div className={styles.container}>
          <div className={styles.header}>
            <Button onClick={() => { openDialog(); }} style={{backgroundColor:'black'}} className={styles.contextButton}>
              <Typography color={'#da8b57'}>View Story Context / Your Day</Typography>
            </Button>
            <Button disabled={storyThreads.length === 0} style={{backgroundColor:storyThreads.length == 0 ? 'transparent':''}} onClick={() => setReadySubmit(prevState => !prevState)} className={`${styles.contextButton} ${storyThreads.length != 0 ? styles.blinkingText : ''}`}>
              <Typography color={storyThreads.length == 0 ? 'gray' : ''}>{!readySubmit ? (storyThreads.length === 0 ? `No investigations made yet` : `Ready with your answer? Click here to submit`) : `Click here to Investigate more...`}</Typography>
            </Button>
          </div>
          <div className={styles.threadContent}>
          <div className={styles.content}>
            {storyThreads.map((entry, index) => (
              <Accordion key={index} style={{ backgroundColor: 'transparent' }} defaultExpanded={index + 1 === storyThreads.length}>
                <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                  <span className={styles.author}>{`${entry.author1} ${index + 1}`}</span>
                </AccordionSummary>
                <AccordionDetails className={styles.storyEntry}>
                  <span className={styles.content}>{entry.query}</span>
                  <hr /><br />
                  <div>
                    <div className={styles.image}>
                      <Image src={`${entry.imageUrl}500x500/`} width={'700'} height={'500'} alt='image' />
                    </div>
                  </div>
                  <div className={styles.content}>
                    {entry.response}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
      <Accordion style={{backgroundColor:'transparent', color:'white'}} defaultExpanded={storyThreads.length == 0}> 
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}>
          <Typography style={{color:'whitesmoke'}}>Here are a few example investigations from other users, for their cases</Typography>
        </AccordionSummary>
        <AccordionDetails>
      <ul className={styles.list}>
      <li><strong>The guy i met at the park, carried a large suitcase, and seemed suspicious</strong></li>
      <li><strong>My friend &lt;Person`s name&gt; gave me a suspicious call, what was it about ?</strong></li>
      <li><strong>The guy at the reception, had strange documents under his chair, what was it about ?</strong></li>
      <li><strong>My trainer &lt;Person name&gt; seemed to be talking about a robbery to someone on the phone, what was it about ?</strong></li>
      </ul>
      </AccordionDetails>
      </Accordion>
    </div>
          <form className={styles.investigationForm} onSubmit={!readySubmit ? handleInvestigation: handleSubmit}>
            <textarea
              
              className={styles.investigationInput}
              placeholder={readySubmit ? "Tell me who do you think the culprit is, along with a short reason.": "Enter your investigation here... You can question or ask about anyone or anyting in your story context."}
              value={investigationInput}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" style={{backgroundColor:readySubmit ? 'green': ''}} className={styles.submitButton}><Typography variant='h5'>{readySubmit ? "Submit Answer" : "Investigate"}</Typography></Button>
          </form>
        </div>
    
      { showAlert &&<Alert style={{position:'fixed', bottom:'20px', left:'45vw', zIndex: 1000}}  variant="filled" severity="success">
  Investigation completed and Email thread sent !
</Alert>}
    </div>}
    </div>
  );
};

export default StoryThread;

