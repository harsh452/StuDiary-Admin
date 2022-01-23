import { Card,  Form, Alert, Col, Row } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { AppBar, Dialog, Slide, Toolbar, Typography,Container,Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/SruDiary.jpeg'
import { firestore, firebaseAuth } from "../firebase";
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

function handleEmail(e) {
    setEmail(e.target.value)
}
function handlePassword(e) {
    setPassword(e.target.value)
}
function login(e) {
        console.log(email);

        firestore.collection('ADMIN').where('email', '==', email)
            .where('isAdmin', '==', true)
            .get()
            .then(querrySnapshot => {
                if (!querrySnapshot.empty) {
                     firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
                        history.push('/home')
                    }).catch(err => {
                        alert(err.code)
                    })
                } else {
                    alert('SORRY ONLY ADMINS ALLOWED')
                }
            })

    }

    return (
       

  <Container maxWidth="sm">
      <Box bgcolor="primary" padding="24px" marginTop="50px" boxShadow="2" borderRadius="12px" textAlign="center">
          <img src={logo} height="100px"/>
          <Typography variant="h5" color="textSecondary">ADMIN</Typography>
          <TextField
          label="email"
          id="outlined-size-small"
          size="small"
          fullWidth
          onChange={handleEmail}
          margin="normal"
        />
        <TextField
          label="Password"
          id="outlined-size-small"
          size="small"
          fullWidth
          onChange={handlePassword}
          type='password'
          margin="normal"
        />
        <Button onClick={login} variant="contained">Login</Button>

      </Box>
  </Container>
    )
}
