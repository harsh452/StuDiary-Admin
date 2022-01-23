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
      videos: [],
    }

  }
  componentDidMount() {
    firestore.collection('Video').where('verified', '==', false).onSnapshot((querrySnapshot) => {
      let VideoData = []
      querrySnapshot.forEach((doc) => {
        VideoData.push(doc.data())
      })
      this.setState({
        videos: VideoData
      })
    })
  }
  verify = (e) => {
    firestore.collection('Video').doc(e).update({verified: true})

  }
  reject = (e) => {
    storageRef.child('Video/'+e+'.mp4').delete().then(()=>{
      firestore.collection('Video').doc(e).delete()
    }).catch((error) => {
      alert("OOPS SOMETHING WENT WRONG")
     });
  }

  render() {
    return (
      <Container>
        <Panel />
        <Stack spacing={2}>
          {this.state.videos?this.state.videos.map((data)=>{
                console.log(this.state.videos);

            if(data.verified==false){
              return <Item>
              <Row>
                <Col>
                <video key={data.video_id} style={{float:'left'}} width="320" height="240" controls>
                   <source key={data.video_id} src={data.url} type="video/mp4"></source>
                </video>
                </Col>
                <Col>
                   <h1 key={data.video_id}>{data.title}</h1>
                   <p key={data.video_id}>{data.description}</p>
                   <em key={data.video_id}>by {data.videoMaker}</em><br></br>
                   <Row>
                     <Col><Button onClick={()=>{
                       this.verify(data.video_id)
                     }} variant="success">Verify</Button></Col>
                     <Col><Button onClick={()=>{
                       this.reject(data.video_id)
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
