import React, { Component } from 'react';
import epoc from './images/epoc.png'

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
        filter: "blur(2px)",
        zIndex: "-1"
      }}>
        <img src={epoc} alt="Fuente: emotiv.com" style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          //
          bottom: "25%",
          right: "25%",
          transform: "scale(2.3)"
        }}/>
      </div>
    );
  }
}

export default BackGroundImage;