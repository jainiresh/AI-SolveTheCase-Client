'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { string } from 'prop-types';
import { orange } from '@mui/material/colors';
import { Alert } from '@mui/material';
import { backendUrl, frontEndUrl } from '@/constants/constants';


const Header: React.FC = () => {


  type Anchor = 'right';

  const [state, setState] = useState({
    right: false
  });
  const [allInvited, setAllInvited] = useState(false);

  const [friends, setFriends] = useState<Contact[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [showAlert, setShowAlert ] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<String> ('Invited successfully, and shared the email threads !');

  interface ContactFetchRequest {
    email: string;
    grantID: string;
  }

  interface Contact {
    _id: string; contactName: string; email: string, isInvited: boolean;
  }




  const fetchContacts = async () => {
    setButtonDisabled(true);
    let email = localStorage.getItem("email");
    let grantID = localStorage.getItem("id")

    if (email && grantID) {
      const contacts = await getContacts({ email, grantID });
      setFriends(contacts)
    }
    setButtonDisabled(false)
    let unInvitedFriends = friends.filter(friend => !friend.isInvited)
    if(!unInvitedFriends)
      setAllInvited(true);

    console.log("All invited " + allInvited)
  }


  const getContacts = async ({ email, grantID }: ContactFetchRequest): Promise<Contact[]> => {
    const contacts = await axios.post<{ data: Contact[] }>(`${backendUrl}/contacts/list`, {
      email,
      grantID
    })

    return contacts.data.data;
  }


  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const inviteFriend = async (id: String) => {
    console.log("Inviting " + id);
    setState({'right':false})
    setShowAlert(true);
    setAlertMessage('Inviting your friend ... ')
    try {
      await axios.post(`${backendUrl}/contacts/invite`, {
        id,
        email: localStorage.getItem("email")
      })
    } catch (error) {
      console.log(error);
    }
    finally {
      setState({
        right: false
      });
      setAlertMessage('Invited successfully, and shared the email threads !')
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      },5000);
    }


  }

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      sx={{ width: 550 }}
    >
      <ListItemText primary={'Invite: '} style={{ marginLeft: '1rem', marginTop: '1rem' }} /> 
      {friends.length == 0 ? <List><Button href='#' type='primary' style={{ marginLeft: '12rem', marginTop: '20rem' }} disabled={buttonDisabled} onClick={() => fetchContacts()}>FETCH CONTACTS</Button></List> :
      <List>
        {allInvited && <ListItemButton disabled><ListItemText style={{fontStyle:'italic', marginLeft:'10rem'}}>You have no contacts here</ListItemText></ListItemButton>}
        {friends.map((friend, index) => (
          friend.isInvited == false && <ListItem key={friend._id} disablePadding onClick={() => inviteFriend(friend._id)}>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={`Invite: ${friend.contactName}  ( ${friend.email} )`} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItemText primary={'Already Invited '} style={{ marginLeft: '1rem', marginTop: '1rem' }} />
        {friends.map((friend, index) => (
          friend.isInvited && <ListItem key={friend._id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={`Invite: ${friend.contactName}  ( ${friend.email} )`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      }
    </Box>
  );

  const logout = () => {
    localStorage.clear();
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    window.location.href = frontEndUrl;
  }

  const back = () => {
    window.location.reload();
  }

  const viewEmailRedirect = () => {
    window.open(`https://mail.google.com/`, '_blank')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mystery Trails</div>
      <div className={styles.actions}>
      <div>
          <Button style={{color:'whitesmoke',  marginRight: '1rem'}} onClick={() => back()}>{'Back'}</Button>
        </div>
        <div>
          <Button style={{color:'whitesmoke',  marginRight: '1rem'}} onClick={() => logout()}>{'Logout'}</Button>
        </div>
        <div>
          <Button style={{color:'white',  marginRight: '1rem'}} onClick={() => viewEmailRedirect()}>{'View Email Threads'}</Button>
        </div>
        <div className={styles.solveButton}>
          <React.Fragment key={'invite'}>
            <Button onClick={toggleDrawer('right', true)} style={{ color: 'white' , fontStyle: 'italic'}}><span >{'Solve with your friends!'}</span></Button>
            <Drawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
          </React.Fragment>
        </div>
        <div className={styles.userIcon}>
          <img src="/detective.svg" alt="User Icon" className={styles.iconImage} />
          {
          }
        </div>
      </div>
      { showAlert && <Alert style={{position:'absolute',bottom:'20px', left:'23vw', zIndex: 1000}} variant="filled" severity="success">
        {alertMessage}
      </Alert>}
    </header>
  );
}

export default Header;
