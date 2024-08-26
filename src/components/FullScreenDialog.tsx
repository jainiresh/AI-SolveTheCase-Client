import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ExpandMoreSharp, FullscreenExit, FullscreenSharp } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps{
    open:boolean;
    setOpen: (open:boolean) => void,
    storyMainPictureUrl: string,
    storyDescription: string,
    title: string,
    dayInput: string,
    introGiven: boolean
    setIntroGiven: (introGiven:boolean) => void
}

export default function FullScreenDialog({open, setOpen, storyMainPictureUrl, storyDescription, title='Story Context', dayInput, introGiven=false, setIntroGiven}: FullScreenDialogProps) {

  console.log("Rendered")
    const [fullScreen, setFullScreen] = React.useState<boolean>(false);
    const [toggleType, setToggleType] = React.useState<string>('story');


 
  const toggleFullScreen = () => {
    setFullScreen(prevState => !prevState)
  }

  const handleClose = () => {
    setOpen(false);
    if(!introGiven)
      setOpen(true)
      setIntroGiven(true);

    setToggleType('story')  
    if(title == 'Case results - Case closed.')
      window.location.reload();
  };

  

  const children = [
    <ToggleButton style={{background:toggleType =='story' ? 'white' : '#262626',color:toggleType == 'story' ? 'black' : 'white'}} value='story' key='story' >
      {'Story Context'}
    </ToggleButton>,
    <ToggleButton style={{background:toggleType == 'story' ? '#262626' : 'white',color:toggleType == 'story' ? 'white' : 'black'}} value="day" key='day'>
      {'Your input day'}
    </ToggleButton>
    
  ];

  const handleStoryDescToggle = (e:React.MouseEvent<HTMLElement>  , flag:string) => {
    console.log("Flag " + flag + "$");
    setToggleType(flag)
  }
 

    return (
        <React.Fragment>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{
              width: '80rem'
            }}
        
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#262626', border:'1px solid #da8b57', display:'flex', flexDirection:'row', justifyContent:'space-between' }}  >
            <IconButton onClick={handleClose} style={{color:'white'}} >
                <CloseIcon />
                </IconButton>
                <Toolbar >
                {!introGiven ? <Typography>Rules and Engagement</Typography> : <Typography variant="h6" component="div" >
                {toggleType == 'answer' ? title: <ToggleButtonGroup onChange={handleStoryDescToggle}>
                  {children}       
                </ToggleButtonGroup>}
                </Typography>}
            </Toolbar>
            <IconButton
             edge="start"
              color="inherit"
              onClick={()=>toggleFullScreen()}
              aria-label="close">
                { fullScreen ? <FullscreenExit /> :
            <FullscreenSharp />
                }
            </IconButton>
            </AppBar>
            <Box sx={{ padding: 2 }}>
          {!introGiven ? <Card>
           <CardContent><Typography>Hey Detective, You have been assigned a case to solve ! </Typography><br /><hr /> <br />
           
           <Typography>Upon closing this dialog box, you would receive a new case story.
            The story involves a crime that happened in your very own town and the culprit is none other than, but someone that you have mentioned in your day input.
           <br /><br />
           <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreSharp />}>           <strong>What should you do ?</strong><br />
            </AccordionSummary>
            <AccordionDetails>
           Your task is investigate, using the investigation feature about any character that you have mentioned in your day input, asking him any questions like a real detective do.<br />
           <i style={{paddingTop:'1rem'}}>There are a few sample investigations in place, to help you form your own investigation.</i>
           </AccordionDetails>
           </Accordion>
           <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreSharp />}>
           <strong>How to Investigate ?</strong></AccordionSummary>
           <AccordionDetails>
           You can question any character/role, regarding their activities ? any suspicious behaviour ? Or their location at the time of theft, etc? Sky is your limit.<br /><br />
           </AccordionDetails>
           </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreSharp />}>
           <strong>How to complete the game ?</strong><br />
           </AccordionSummary>
           <AccordionDetails>
           Investigate untill you please, and when you feel like you have found the culprit, click on the <i>&quot;Ready with your answer? Click here to submit&quot;</i> button on the top right, to submit and solve the case. It is that simple !
           </AccordionDetails>

           </Accordion>
           <div style={{marginTop:'1rem'}}>
           Feel free to read your story context, or your day input anytime, to think of different scenarios for Investigation.<br /><br /><hr />
           
           <span style={{color:'gray', fontStyle:'italic'}}>
           To help you track the case, the AI automatically nicknames any character in your day input, without names.</span>
           </div></Typography>
           
           </CardContent>
          </Card> : <Card>
            {toggleType == 'story' && <CardMedia
              component="img"   
              height={'100%'}
              image={storyMainPictureUrl} // Replace with your image URL
              alt="Descriptive Alt Text"
            />}
            <CardContent>
              <Typography variant="body1" component="div">
                {toggleType == 'story' || toggleType == 'answer' ? storyDescription : dayInput.replace('/\\n/g','\t')}
              </Typography>
            </CardContent>
          </Card>}
        </Box>
            
        </Dialog>
        </React.Fragment>
    );
    }