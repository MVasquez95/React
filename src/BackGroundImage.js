import React, { Component } from 'react';
import epoc from './images/head.png'

class BackGroundImage extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        //
        position: "fixed",
        top: "0",
        left: "0",
        //
        filter: "blur(0px)",
        zIndex: "-1"
      }}>
        <img src={epoc} alt="Fuente: emotiv.com" style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          //
          transform: "translateX(-50%) scale(1.5)"
        }}/>
      </div>
    );
  }
}

export default BackGroundImage;