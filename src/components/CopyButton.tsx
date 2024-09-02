import React, { useEffect, useState } from 'react';
import { Alert, IconButton, Typography } from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import styles from '../styles/CopyButton.module.css'; // Make sure to import your CSS module
import { testDay } from '@/constants/constants';
import { CopyAll } from '@mui/icons-material';

// Define the props for TypingEffect
interface TypingEffectProps {
    text: string;
    speed: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState<string>('');

    useEffect(() => {
        let index = 0;
        setDisplayText(''); // Clear previous text
        const typingInterval = setInterval(() => {
            if (index < text.length-1) {
                setDisplayText(prev => prev + text[index]);
                index+=1;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
    
        return () => clearInterval(typingInterval);
    }, [text, speed]);
    
    

    return (
        <Typography 
            className={`${styles.typingTextChild} ${styles.glow}`} 
        >
            {displayText}
        </Typography>
    );
};

// Define the props for CopyButton
interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {

    const [showAlert, setShowAlert] = useState(false);
   
    const copyText = async (text: string) => {
        setShowAlert(true);
        await navigator.clipboard.writeText(text);
        setTimeout(()=>{
          setShowAlert(false);
        },3000)
      }

    return (
        <div className={styles.container} onClick={() => copyText(text)} style={{display:'flex', flexDirection:'column'}}>
            <Typography className={`${styles.typingText} ${styles.glow}`} >Here is a sample input, click here to copyText <CopyAll /></Typography>
            <TypingEffect text={text} speed={10}  />
            {showAlert && <Alert style={{position:'fixed', bottom:'40px', left:'45vw', zIndex: 1000, scale:'1.6'}} variant="filled" severity="success">
        Message copied successfully !
      </Alert>}
        </div>
    );
};

export default CopyButton;
