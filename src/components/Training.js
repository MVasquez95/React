import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';
import './Training.scss'
import { decodeState } from '../Utils'

class Training extends Component {

  state = {
    isLeaving: false,
    isGameStarted: false,
    showStartButton: false,
    decodedState: {}
  }

  movement = {
    1: "right",
    2: "left"
  }
  constructor(props) {
    super(props);

    this.unityContent = new UnityContent(
      "/Build/build.json",
      "/Build/UnityLoader.js"
    );

    this.unityContent.on("ready", _ => {
      this.setState({ showStartButton: true }, () => {
        // console.log(this.movement[this.state.decodedState.movement])
        if (this.state.isGameStarted) {
          this.startAndSaveTrial()
        }
      })
    });
  }
  
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ isLeaving: true })
    }
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("bciuser"));
    let decodedState = decodeState(user.state)
    console.log(decodedState)
    this.setState({ decodedState })
    document.addEventListener("keydown", this.escFunction, false);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  
  startAndSaveTrial = () => {
    this.setState({ isGameStarted: true }, () => {

      let user = JSON.parse(localStorage.getItem("bciuser"));

      // fetch('http://localhost:4000/training/start', {
      fetch('http://18.219.150.69:4000/training/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user.userid }),
      })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        let user = JSON.parse(localStorage.getItem("bciuser"));
        user.state += 1;
        console.log(user)
        localStorage.setItem("bciuser", JSON.stringify(user));
        let decodedState = decodeState(user.state)
        this.setState({ decodedState }, () =>{
          console.log(this.movement[this.state.decodedState.movement])
          this.unityContent.send("ReactCollector", "startGraz", this.movement[this.state.decodedState.movement] + ",training");
        })
      })
    })
  }
  
  render() {
    if (this.state.isLeaving) {
      return <Redirect to='/home' />
    }
    return (
      <div className="unity-wrapper">
        {(this.state.showStartButton && !this.state.isGameStarted) &&
          <div className="start-button" onClick={this.startAndSaveTrial}>Start</div>
        }
        <Unity unityContent={this.unityContent} />;
      </div>
    )
  }
}

export default Training;