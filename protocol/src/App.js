import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Training from './components/Training';
import Detail from './components/Detail';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation></Navigation>
        <Route path="/train" component={Training} />
        <Route path="/detail" component={Detail} />
      </div>
    </Router>
  );
}

export default App;
