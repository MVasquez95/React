import React from 'react';
import '../tailwind.generated.css';
import { Row } from './Utils';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import User from './User'
import Protocol from './Protocol'
import Movement from './Movement'
import Task from './Task'
import Model from './Model'
import Classifier from './Classifier'

// Temporary
import Sidebar from '../custom/Sidebar'

const App = () => {
  return (
    <Row className="w-screen h-screen bg-gray-200 fade-in">
      <Router>
        <Sidebar />
        <Switch>
          <Route path = "/user" exact component = {User} />
          <Route path = "/protocol" exact component = {Protocol} />
          <Route path = "/movement" exact component = {Movement} />
          <Route path = "/task" exact component = {Task} />
          <Route path = "/model" exact component = {Model} />
          <Route path = "/classifier" exact component = {Classifier} />
        </Switch>
      </Router>
    </Row>
  );
}

export default App;
