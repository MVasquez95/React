import React, { Component } from 'react';
import '../App.css';
import './Detail.css'
import './circle.css'
import BackHomeButton from '../common/BackHomeButton';

class Detail extends Component {
  state = {
    user: null,
    info: null,
    isSynchronized: true,
  }

  componentDidMount = () => {
    let userS = JSON.parse(localStorage.getItem("bciuser"));
    console.log(`Last user saved (from localStorage): ${userS.userid}`)

    Promise.all([fetch(`http://localhost:4000/users/${userS.userid}`), fetch(`http://localhost:4000/daemon/info`)])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(([user, info]) => {
        console.log(user, info)
        // This compare the info between database and daemon
        let sameUserID = user.userid === info.userid
        let sameFileLen = user.timestamps.length === info.len
        // pending
        // let sameLastState = false
        let isSynchronized = sameUserID && sameFileLen
        console.log("Synchronized: ", sameUserID, sameFileLen)
        console.log("isSynchronized: ", isSynchronized)
        user.timestamps.reverse()
        this.setState({ user, info, isSynchronized })
      })
  }

  train = () => {
    // disabled button inmediatly then activate if there is an error

    if (!this.state.isSynchronized) {
      console.log("should train ", this.state.user.userid )
      fetch(`http://localhost:4000/training/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: this.state.user.userid }),
      })
      .then(response => response.json())
      .then(info => {
        console.log(info)
        let sameUserID = this.state.user.userid === info.userid
        let sameFileLen = this.state.user.timestamps.length === info.len
        // pending
        // let sameLastState = false
        let isSynchronized = sameUserID && sameFileLen
        this.setState({ info, isSynchronized })
      })
    }
  }

  render() {
    let files = this.state.user ? this.state.user.timestamps.map((t, i, arr) => (
      <div key={arr.length - i} className="row-detail">
        <p>{arr.length - i}</p>
        <p>{t}</p>
      </div>
    )) : null

    let infodump = this.state.info ? (
      <div className="info-dump">
        <h1>Daemon info</h1>
        <p>{`User ID: ${this.state.info.userid}`}</p>
        <p>{`Files Saved: ${this.state.info.len}`}</p>
        <p>{`Current Session: ${this.state.info.current_session}`}</p>
        <p>{`Session used for training: ${this.state.info.session_for_training}`}</p>
      </div>
    ) : null

    let percentage = this.state.info ? Math.floor(this.state.info.current_session_percentage * 100) : 0

    return (
      <div className="detail">
        <BackHomeButton route="/home" />

        <div className="info-container">
          <div className="status-card">
            <div className={`c100 p${percentage}`}>
              <span>{percentage}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
            {infodump}
          </div>
          <div className={`train-button ${this.state.isSynchronized ? 'disabled' : ""}`} onClick={this.train}><p>Train</p></div>
        </div>

        <div className="table-detail">
          <div className="row-detail titles">
            <p>Estado</p>
            <p>Timestamp</p>
          </div>
          {files}
        </div>
      </div>
    )
  }
}

export default Detail;