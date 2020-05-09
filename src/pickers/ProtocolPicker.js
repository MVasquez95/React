import React from 'react';
import '../App.css';
import './../components/Home.css'

import OptionButton from '../common/OptionButton';
import BackHomeButton from '../common/BackHomeButton';

const ProtocolPicker = () =>
  (
    <div className="home">
      <BackHomeButton route="home" />
      <div className="options-container">
        <OptionButton route="/train"
          text="Protocolo Graz" />
        <OptionButton route="/a-train"
          text="Protocolo A-BCI" />
        <OptionButton route="/b-train"
          text="Protocolo ADICCPIAEV-BCI" />
      </div>
    </div>
  )

export default ProtocolPicker;