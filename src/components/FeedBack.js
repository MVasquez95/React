import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';
// import './Training.css'

class FeedBack extends Component {

  state = {
    isLeaving: false,
    isGameStarted: false,
  }

  callingFeedBack = null;

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
      console.log("it is ready baby")
      this.callingFeedBack = setInterval(() => {
        this.unityContent.send("FeedBackManager", "applyFeedBack", 0.01)
      }, 100)
    });

  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ isLeaving: true })
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