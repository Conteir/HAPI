import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { enviroments } from './config.ts';
import HTMLRender from './components/htmlRenderComponent.jsx';
import { Spinner } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NewPage } from './components/NewPage.jsx';


class MyPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: false,
      uglyId: '',
      codeSystem: '',
      code: '',
      url: '',
      response: '',
      records: [],
      enviroment: 'prod'
    };

  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ response: '' });

    //const urlAddress = 'https://api.helsedirektoratet.no/innhold/innhold';
    const enviroment = this.state.enviroment;
    let setEnviroments = enviroments.find(o => o.id === enviroment);

    let url = setEnviroments.url;
    let key = setEnviroments.key
    if (this.state.uglyId) {
      url += '/' + this.state.uglyId;
    } else if(this.state.codeSystem && this.state.code) {
      url += '?kodeverk=' + this.state.codeSystem + "&kode=" + this.state.code;
    } 
    /*else {
      alert("Neither HAPI-id nor Code defined!")
      return;
    }*/


    this.setState({ url: url });
    this.setState({ showSpinner: true });

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Ocp-Apim-Subscription-Key': key
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.responseHandler(data);
        this.setState({ showSpinner: false });
      }, () => this.setState({ showSpinner: false }))
     
      ;
  }

  responseHandler = (data) => {
    if (data) {
      this.setState({
        response: JSON.stringify(data, null, 2)
      });
    } 
  }

  myChangeHandler = (event) => {
    this.setState({
      uglyId: event.target.value
    });
  }

  ChangeHandlerCode = (event) => {
    this.setState({
      code: event.target.value
    });
  }

  ChangeHandlerCodeSystem = (event) => {
    this.setState({
      codeSystem: event.target.value
    });
  }

  ChangeHandlerEnviroment = (event) => {
    this.setState({
      enviroment: event.target.value
    });
  }


  render() {
    return (
      <div>

        <div className="jumbotron text-center">
          <h1>Search HAPI</h1>
          <p>Get content from Helsedirektoratet</p> 
      

          <Router>
            <div>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="/" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                    <a className="nav-item nav-link" id="nav-newpage-tab" data-toggle="tab" href="/newpage" role="tab" aria-controls="nav-newpage" aria-selected="false">New page</a>
                  </div>
                </nav>
                <Switch>
                  <Route exact path="/" >
                  </Route>
                  <Route path="/newpage" component={NewPage}>
                    <NewPage />
                  </Route>
                </Switch>

              </div>
          </Router>
        </div>

        <form onSubmit={this.mySubmitHandler}>

            <div className="form-group">
              <select name="enviroment" id="enviroment"
                onChange={evt => this.ChangeHandlerEnviroment(evt)}
              >

                <option value="prod">Production</option>
                <option value="test-bt">Test BT</option>
                <option value="test-st">Test ST</option>
                <option value="qa">QA</option>

              </select>  
            </div>

            <div className="row">
              <div className="col">
                <p>Please provide either HAPI-id or code from a code system</p>
              </div>
            </div>

            <div className="form-group">
              <input
                id="id"
                type='text'
                autoComplete="on"
                placeholder="HAPI-id"
                value={this.state.uglyId}
                onChange={evt => this.myChangeHandler(evt)}
              />
            </div>

            <div className="form-group">
                <span className="marginRight">or</span>
            </div>

            <div className="form-group">
              <select name="codeSystem" id="codeSystem"
                onChange={evt => this.ChangeHandlerCodeSystem(evt)}
              >
                <option value="" select="default">Choose code system</option>
                <option value="ICD-10">ICD-10</option>
                <option value="ICPC-2">ICPC-2</option>
                <option value="ATC">ATC</option>
                <option value="SNOMED-CT">SNOMED-CT</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type='text'
                autoComplete="on"
                id="code"
                placeholder="Code"
                value={this.state.code}
                onChange={evt => this.ChangeHandlerCode(evt)}
              />
            </div>

            <div className="form-group">
              <input
                type='submit'
                value="Search"
                disabled={!(this.state.uglyId || this.state.codeSystem || this.state.code)}
              />
            </div>

             {this.state.showSpinner ? <Spinner color="success" /> : null}      
            
        </form>

        <div>
          <HTMLRender data={this.state.response}/>
        </div>

        <div><pre>{this.state.response}</pre></div>
        <div><pre><h4>{this.state.url}</h4></pre></div>
        
      </div>
    );
  };

}


ReactDOM.render(<MyPage />, document.getElementById('root'));

reportWebVitals();
