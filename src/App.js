import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Training from './components/Training';
// import ATraining from './components/ATraining';
import MindRace from './components/MindRace';
import Dashboard from './dashboard/App';
// import Detail from './components/Detail';
// import Home from './components/Home';
// import Login from './components/Login';
// import FeedBack from './components/FeedBack';
// import AFeedBack from './components/AFeedBack';

// import BackgroundImage from './BackGroundImage';
// import FeedbackPicker from './pickers/FeedbackPicker';
// import ProtocolPicker from './pickers/ProtocolPicker';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <BackgroundImage />
//         <Switch>
//           <Route path="/" exact component={Login} />

//           <Route path="/protocol-picker" exact component={ProtocolPicker} />
//           <Route path="/train" exact component={Training} />
//           <Route path="/a-train" exact component={ATraining} />
//           <Route path="/b-train" exact component={BTraining} />

//           <Route path="/detail" component={Detail} />
//           <Route path="/home" component={Home} />

//           <Route path="/feedback-picker" component={FeedbackPicker} />
//           <Route path="/feedback" component={FeedBack} />
//           <Route path="/a-feedback" component={AFeedBack} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import Login from './new/Login'
import Home from './new/Home'
import Pool from './new/Pool'
import { Column } from './new/Utils';

// redirect here

const App = () => {
  return (
    <Column className="w-screen h-screen bg-gray-200">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/pool" component={Pool} />
          <Route path="/mind-race" component={MindRace} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Column>
  );
}

export default App;