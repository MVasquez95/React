import React from 'react';
import emotiv from '../images/epoc.png';
import './LoadingTraining.scss';

const LoadingTraining = () => (
  <div className="loading-training">
    <div className="lds-dual-ring">
      <img src={emotiv} alt="Fuente: emotiv.com" />
      <p>Training user profile</p>
    </div>
  </div>
)

export default LoadingTraining;