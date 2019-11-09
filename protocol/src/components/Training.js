import React, {Component} from 'react';
import '../App.css';
import Unity, { UnityContent } from "react-unity-webgl";

class Training extends Component {    
    constructor(props) {
        super(props);
     
        this.unityContent = new UnityContent(
          "/Build/GrazWeb.json",
          "/Build/UnityLoader.js"
        );
      }
    render() {
        return (
            <div>
                <Unity unityContent={this.unityContent} />;
            </div>
        )
     }
}

export default Training;