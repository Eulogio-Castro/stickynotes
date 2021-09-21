import React, {useState} from 'react';
import styled from 'styled-components';
import firebase from 'firebase/compat/app/';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container/'
import Grid from '@mui/material/Grid';
import 'react-bootstrap';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import firebaseLogo from './logo-built_black.svg';

import { doc } from "firebase/compat/firestore";
import { setDoc, deleteDoc } from '@firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth/';
import {useCollectionData} from 'react-firebase-hooks/firestore/';
import Item from './Components/Item';
import './App.css';
import { CardGroup, Row } from 'react-bootstrap';
import { blue, red } from '@mui/material/colors';
import { Block } from '@mui/icons-material';
import ReactLogo from './logo.svg'
import materialLogo from './material-ui-1.svg';
import googleSignLogo from './btn_google_signin_dark_normal_web@2x.png';
import journalIcon from './journal.svg';
import { fontSize } from '@mui/system';





const firebaseConfig = {
  apiKey: "AIzaSyBYUlFnKgVpT-YJOUG372vcdngYSx8bav8",
  authDomain: "to-do-list-d2b43.firebaseapp.com",
  projectId: "to-do-list-d2b43",
  storageBucket: "to-do-list-d2b43.appspot.com",
  messagingSenderId: "705433117880",
  appId: "1:705433117880:web:32a4f098c474eda528404d",
  measurementId: "G-MHWBDXLM5L"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {
  
  const [user] = useAuthState(auth);
 
  return (
    <div className="App">
      <header className="Header">
        <h5>Made possible by:</h5>
        <Stack direction="row" justifyContent="center" spacing={4} paddingBottom ={0} height={40}>
          <img src = {ReactLogo} margin width="100"   alt="FirebaseLogo"></img>
          <img src = {firebaseLogo} width="150"  alt="FirebaseLogo"></img>
          <img src = {materialLogo} width="75"  alt="FirebaseLogo"></img>
        </Stack>
        
        <h1>Sticky Notes<NoteAddIcon  fontSize="large"/></h1>
        
      </header>


      <SignOut/>

       <div>
        { user ? <ToDoList/> : <SignIn/>}
      </div>

        
     
    </div>
  );
}


function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  return(
    <>
      <Button variant="text" aria-label="Sign in with Google" onClick= {signInWithGoogle}><img src={googleSignLogo}/></Button>
    </>
  )

}

function SignOut(){
  return auth.currentUser && (
    <Stack px = {20}>
      <Button variant="contained" color="error" onClick={() => auth.signOut()}>Sign Out <ExitToAppOutlinedIcon /></Button>
    </Stack>
  )
}

function ToDoList() {
  const {uid} = auth.currentUser;
  const todoRef = firestore.collection('todoitems');
  const query = todoRef.where('uid', '==', uid);
  const [todos] = useCollectionData(query);
  const [formBody, setFormBody] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const sendTodo = async (e) => {
    e.preventDefault();
    const docRef = todoRef.doc();

    await setDoc(docRef, {
      docID: docRef.id,
      body: formBody,
      title: formTitle,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    });


    setFormBody('');
    setFormTitle('');

  }


  return(
    <>
        <Stack alignItems ="center" bgcolor ="#f2f2f2">
          <TextField
            multiline
            label="Note Title"
            variant="outlined"
            margin = "normal"
            value = {formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <TextField
            multiline
            rows ={3}
            label="Note Body"
            variant="outlined"
            margin = "none"
            value={formBody}
            onChange={(e) => setFormBody(e.target.value)}
          />
          <Button aria-label="Send" onClick= {sendTodo}><SendIcon sx={{color:blue[500]}}/></Button>
          
        </Stack>

        <Grid container justifyContent="center">
          {todos && todos.map(todo =>
          <>
            <Item key={todo.docID} info = {todo} firestore = {firestore}/>
          </>
          )}
        </Grid>

  </>


  )
  

}

export default App;
