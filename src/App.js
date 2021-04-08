import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, NewPage } from "./components";

//import logo from './logo.svg';
//import './App.css';

class App extends React.Component {
  
  render() {
    
    return <div className="App">
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/newpage" exact component={() => <NewPage />} />
      </Switch>
      <Footer />
    </Router>
  </div>
  }
}


export default App;