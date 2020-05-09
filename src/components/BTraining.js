import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';
import './Training.scss'

class Training extends Component {

  state = {
    isLeaving: false
  }

  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      "/BBuild/build.json",
      "/BBuild/UnityLoader.js"
    );
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

  render() {
    if (this.state.isLeaving) {
      return <Redirect to='/home' />
    }
    return (
      <div className="unity-wrapper">
        <Unity unityContent={this.unityContent} />;
      </div>
    )
  }
}

export default Training;