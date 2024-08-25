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
import { Box, Card, CardContent, CardMedia, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FullscreenExit, FullscreenSharp } from '@mui/icons-material';

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
            maxWidth={'lg'}
        
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#262626', border:'1px solid #da8b57', display:'flex', flexDirection:'row', justifyContent:'space-between' }}  >
            <IconButton onClick={handleClose} style={{color:'white'}} >
                <CloseIcon />
                </IconButton>
                <Toolbar >
                {!introGiven ? <Typography>Introduction</Typography> : <Typography variant="h6" component="div" >
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
           
           <Typography>Upon closing this dialog box, you would receive a new case story, which is nothing but a crime that happened in your town.
           The culprit is none other than, but someone you have mentioned in your day input.</Typography></CardContent>
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