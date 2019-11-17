import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';
import { setInterval } from 'timers';
// import './Training.css'

class FeedBack extends Component {

  state = {
    isLeaving: false,
    isGameStarted: false,
  }

  feedbackInterval = null;

  feedbackchannel = null;
  // feedbackchannel = new WebSocket('ws://localhost:8081/training/feedback');

  constructor(props) {
    super(props);

    this.unityContent = new UnityContent(
      "/Build/build.json",
      "/Build/UnityLoader.js"
    );

    this.unityContent.on("ready", _ => {
      console.log("this should work")
      this.unityContent.send("ReactCollector", "startGraz", "None,feedback")
    });

    this.unityContent.on("feedBackReady", _ => {

      this.feedbackchannel = new WebSocket('ws://localhost:8081/training/feedback');
      console.log(this.feedbackchannel)
      // this.feedbackchannel.on('open', () => {
      this.feedbackchannel.onopen = () => {
        console.log("connected")
        let user = JSON.parse(localStorage.getItem("bciuser"));

        let predictMessage = {
          action: "predict",
          userid: user.userid,
        }

        this.feedbackInterval = setInterval(() => {
          this.feedbackchannel.send(JSON.stringify(predictMessage));
        }, 1500)

      };

      // this.feedbackchannel.on('message', (data, flags) => {
      this.feedbackchannel.onmessage = (data, flags) => {
        console.log("from global")
        console.log(data.data);
        let movement = JSON.parse(data.data);
        console.log(movement)
        console.log(movement.movement)
        console.log(movement.movement[0])
        if (movement.movement[0] === 0) {
          this.unityContent.send("FeedBackManager", "applyFeedBack", 0.1)
        } else {
          this.unityContent.send("FeedBackManager", "applyFeedBack", -0.1)
        }
      };

      this.feedbackchannel.onerror = (data, flags) => {
        console.log("from global an error")
        console.log(data)
      };
    });
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ isLeaving: true }, () => {
        clearInterval(this.feedbackInterval)
      })
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    clearInterval(this.callingFeedBack)
  }

  render() {
    if (this.state.isLeaving) {
      return <Redirect to='/home' />
    }
    return (
      <div style={{
        position: "fixed",
        width: "100%",
        height: "100%",
      }}>
        <Unity unityContent={this.unityContent} />;
      </div>
    )
  }
}

export default FeedBack;