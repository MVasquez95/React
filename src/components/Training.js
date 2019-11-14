import React, { Component } from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";
import { Redirect } from 'react-router-dom';

class Training extends Component {

  state = {
    isLeaving: false,
  }

  constructor(props) {
    super(props);

    this.unityContent = new UnityContent(
      "/Build/GrazWeb.json",
      "/Build/UnityLoader.js"
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
      <div style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        // left: "50%",
        //
        // transform: "translateY(-50%)"
      }}>
        <Unity unityContent={this.unityContent} />;
            </div>
    )
  }
}

export default Training;