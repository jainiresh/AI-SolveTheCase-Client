"use client";
import React, {useEffect, useState} from 'react';
import { useSearchParams } from "next/navigation";
import StartStoryHome from './StartStory';
import styles from '../styles/Story.module.css'
import GameLoader from './GameLoader';
import {post} from '../helpers/request'
import StoryThread from './StoryThread';
import { Alert } from '@mui/material';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUUID(uuid: string) {
    return uuidPattern.test(uuid);
}

const sampleEntries = [
  {
    id: 1,
    author1: "Player 1",
    author2: "Player 2",
    query: "I met John at the park. He was talking to someone on the phone.",
    response: "I met John at the park. He was talking to someone on the phone.",
    timestamp: "Today at 3:45 PM"
  }
];



export const Story: React.FC = () => {
  const searchParams = useSearchParams();
  const [doesStoryExists, setDoesStoryExists] = useState<boolean>(true);
  const [storyInput, setStoryInput] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [firstTime, setFirstTime] = React.useState(false);
  let id = searchParams.get("id");
  let email = searchParams.get("email")

  const checkifStoryExists = async(email: string) => {
    const response = await post("/story/exists", {"email": email});
    const isExists = response.data['response'];
    console.log("Is existing story " + isExists)
    setDoesStoryExists(isExists);
    setShowLoader(false);
  }

  useEffect(()=>{ if(id && email && isValidUUID(id)) {
    localStorage.setItem("id",id as string);
    localStorage.setItem("email",email as string);
    checkifStoryExists(email);
  }},[])
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);
    const storyCreationResponse = await post("/story/create", {
        data:storyInput,
        email: localStorage.getItem('email')
    }
  )
    setShowAlert(true);
    setFirstTime(true);
    setTimeout(() => {
      setShowAlert(false)
    },3000);
    setDoesStoryExists(true)
    setShowLoader(false)
    console.log(storyInput)
  };


  return (
    <div className={styles.container}> 
    <div>
    {showLoader ? <GameLoader loadingText='Creating'/> 
      : 
      doesStoryExists ? 
      <StoryThread entries={sampleEntries} firstTime={firstTime}/> 
      : 
     <StartStoryHome storyInput={storyInput} setStoryInput={setStoryInput} handleSubmit={handleSubmit}/>}
  </div>
  {showAlert && <Alert style={{position:'fixed', bottom:'100px', left:'45vw', zIndex: 1000, scale:'1.6'}} variant="filled" severity="success">
       Story created successfully !
      </Alert>}
    </div>
  );
};

