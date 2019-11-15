import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';
import './Training.css'

class Training extends Component {

  state = {
    isLeaving: false,
    isGameStarted: false,
  }

  constructor(props) {
    super(props);

    this.unityContent = new UnityContent(
      "/Build/build.json",
      "/Build/UnityLoader.js"
    );

    this.unityContent.on("newTrial", _ => {
      console.log("a new trial should be executed");
      // this.startTrial("right");
    });
    
    // this.unityContent.on("ready", _ => {
    //   this.setState({ isGameStarted: false })
    // this.startTrial("right");
    // });
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
  }

  startTrial = (mov) => {
    // this.setState({ isGameStarted: true }, () => {
      // user = JSON.parse(localStorage.get("bci"))
      // new function extract_state(filename)
      // movement = decode_state(state)
      // call localhost:4000/training/start user = user
      this.unityContent.send(
        "ReactCollector",
        "startGraz",
        mov
        // movement
        // "ella no te ama"
      );
    // })
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
        {!this.state.isGameStarted && <div className="start-button left" onClick={() => this.startTrial("left")}>Left</div>}
        {!this.state.isGameStarted && <div className="start-button right" onClick={() => this.startTrial("right")}>Right</div>}
        <Unity unityContent={this.unityContent} />;
      </div>
    )
  }
}

export default Training;