import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { firestore, firebaseAuth,storageRef } from "../firebase";
import { Row,Col,Button } from 'react-bootstrap';
import Panel from './Panel';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export class Mainsection extends Component {
  constructor(props) {

    super(props)
    this.state = {
      blogs: [],
    }

  }
  componentDidMount() {
    firestore.collection('Blog').where('verified', '==', false).onSnapshot((querrySnapshot) => {
      let BlogData = []
      querrySnapshot.forEach((doc) => {
        BlogData.push(doc.data())
      })
      this.setState({
        blogs: BlogData
      })
    })
  }
  verify = (e) => {
    firestore.collection('Blog').doc(e).update({verified: true})

  }
  reject = (e) => {
    storageRef.child('BlogImage/'+e+'.jpg').delete().then(()=>{
      firestore.collection('Blog').doc(e).delete()
    }).catch((error) => {
      alert("OOPS SOMETHING WENT WRONG")
     });
  }

  render() {
    return (
      <Container>
        <Panel />
        <Stack spacing={2}>
          {this.state.blogs?this.state.blogs.map((data)=>{
            if(data.verified==false){
                console.log(data.Id);
              return <Item>
              <Row>
                <Col>
                <img key={data.Id} src={data.uri} height="200px" />
                </Col>
                <Col key={data.Id}>
                   <h4 key={data.Id}>{data.title}</h4>
                   <p key={data.Id}>{data.content}</p>
                   <em key={data.Id}>by {data.name}</em><br></br>
                   <Row>
                     <Col><Button onClick={()=>{
                       this.verify(data.Id)
                     }} variant="success">Verify</Button></Col>
                     <Col><Button onClick={()=>{
                       this.reject(data.Id)
                     }} variant="danger">reject</Button></Col>
                   </Row>
                </Col>
              </Row>
              
              </Item>
            }
          
          }):null}
        </Stack>
      </Container>
    )
  }
}

export default Mainsection
