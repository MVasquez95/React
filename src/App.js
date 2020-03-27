import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Training from './components/Training';
import ATraining from './components/ATraining';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import FeedBack from './components/FeedBack';
import AFeedBack from './components/AFeedBack';

import BackgroundImage from './BackGroundImage';
import FeedbackPicker from './pickers/FeedbackPicker';
import ProtocolPicker from './pickers/ProtocolPicker';

const App = () => {
  return (
    <Router>
      <div className="App">
        <BackgroundImage />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/train" exact component={Training} />
          <Route path="/a-train" exact component={ATraining} />
          <Route path="/protocol-picker" exact component={ProtocolPicker} />
          <Route path="/detail" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/feedback" component={FeedBack} />
          <Route path="/a-feedback" component={AFeedBack} />
          <Route path="/feedback-picker" component={FeedbackPicker} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
