import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NewPage } from './components/NewPage.jsx';
import { HomePage } from './components/HomePage.jsx';
import { Documentation } from './components/Documentation.jsx';

export const App = class App extends React.Component {
  
  render() {
    
    return (
      <div className="App">
        <Router>
          <div>

            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active" id="nav-homepage-tab" data-toggle="tab" href="/" role="tab" aria-controls="nav-homepage" aria-selected="true">Search HAPI</a>
                <a className="nav-item nav-link" id="nav-newpage-tab" data-toggle="tab" href="/newpage" role="tab" aria-controls="nav-newpage" aria-selected="false">Get ID</a>
                <a className="nav-item nav-link" id="nav-documentation-tab" data-toggle="tab" href="/documentation" role="tab" aria-controls="nav-documentation" aria-selected="false">Documentation</a>
              </div>
            </nav>

            <Switch>
              <Route exact path="/" >
                <HomePage/>
              </Route>
              <Route path="/newpage" component={NewPage}>
                <NewPage />
              </Route>
              <Route path="/documentation" component={Documentation}>
                <Documentation />
              </Route>
            </Switch>

          </div>
        </Router>
      </div>
    )
  }
}

export default App;