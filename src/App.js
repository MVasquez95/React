import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Training from './components/Training';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import FeedBack from './components/FeedBack';

import BackgroundImage from './BackGroundImage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <BackgroundImage />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/train" exact component={Training} />
          <Route path="/detail" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/feedback" component={FeedBack} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
