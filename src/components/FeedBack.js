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
  feedbackChannel = null;

  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      "/Build/build.json",
      "/Build/UnityLoader.js"
    );
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.escFunction, false);

    this.unityContent.on("ready", _ => {
      console.log("this should work")
      this.unityContent.send("ReactCollector", "startGraz", "None,feedback")
    });

    this.unityContent.on("feedBackReady", _ => {
      this.feedbackChannel = new WebSocket('ws://localhost:8081/training/feedback');
      
      this.feedbackChannel.onopen = () => {
        console.log("connected")
        let user = JSON.parse(localStorage.getItem("bciuser"));
        let predictMessage = {
          action: "predict",
          userid: user.userid,
        }
        this.feedbackInterval = setInterval(() => {
          this.feedbackChannel.send(JSON.stringify(predictMessage));
        }, 1500)
        console.log(this.feedbackInterval._id)
      };

      this.feedbackChannel.onmessage = (data, flags) => {
        let movement = JSON.parse(data.data);
        console.log("Movement from daemon: ", movement.movement[0])
        if (movement.movement[0] === 0) {
          this.unityContent.send("FeedBackManager", "applyFeedBack", 0.1)
        } else {
          this.unityContent.send("FeedBackManager", "applyFeedBack", -0.1)
        }
      };

      this.feedbackChannel.onerror = (data, flags) => {
        console.log("from global an error")
        console.log(data)
      };
    });
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      console.log("clearing interval");
      if (this.feedbackInterval) {
        clearInterval(this.feedbackInterval._id)
      }
      if (this.feedbackChannel) {
        this.feedbackChannel.close();
      }
      this.setState({ isLeaving: true })
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
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