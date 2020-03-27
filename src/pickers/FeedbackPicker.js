import React from 'react';
import '../App.css';
import './../components/Home.css'

import OptionButton from '../common/OptionButton';
import BackHomeButton from '../common/BackHomeButton';

const FeedbackPicker = () =>
  (
    <div className="home">
      <BackHomeButton route="home" />
      <div className="options-container">
        <OptionButton route="/feedback"
          text="Feedback Graz" />
        <OptionButton route="/a-feedback"
          text="Feedback A-BCI" />
        <OptionButton route="/feedback"
          text="Feedback ADICCPIAEV-BCI" />
      </div>
    </div>
  )

export default FeedbackPicker;