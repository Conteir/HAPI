import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
//import App from './App';

class MyPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      uglyId: '',
      codeSystem: 'icpc-2', //values for checking
      code: 'x76',
      url: '',
      response: '',
      records: [],
    };

  }
  
  mySubmitHandler = (event) => {
    event.preventDefault();

    const urlAddress = 'https://api.helsedirektoratet.no/innhold/innhold';

    let url = urlAddress;
    if (this.state.uglyId) {
      url += '/' + this.state.uglyId;
    } else if(this.state.codeSystem && this.state.code) {
      url += '?kodeverk=' + this.state.codeSystem + "&kode=" + this.state.code;
    } else {
      url += this.state.uglyId;
    }

    this.setState({url: url});

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Ocp-Apim-Subscription-Key' : '89b72a3ad5cf4723b3f489c3eb4d82a1'
        }
      }
      )
    .then(response => response.json())
    .then(data => this.responseHandler(data));
  }

  responseHandler = (data) => {
    if(data) {
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

  renderJson() {
    if(this.state.response) {
      let json = JSON.parse(this.state.response);
      console.log(json);
  
      return json.map((item, index) =>
        <div key={index}>
          <table><tbody>
  
              <tr>
                <td style={{fontWeight: "bold"}}>Id</td><td>{item.id ? item.id : ''}</td>
              </tr>
  
              <tr>
                <td style={{fontWeight: "bold"}}>intro</td><td>{item.intro ? item.id : ''}</td>
              </tr>
  
              <tr>
                <td>Owner</td><td>{item.eier ? item.eier : ''}</td>
              </tr>
  
              <tr>
                <td>DokumentType</td><td>{item.dokumentType ? item.dokumentType : ''}</td>
              </tr>
  
  
  
            </tbody></table>
  
            <div className="content">
              <div><h1>{item.tittel}</h1></div>
              <div dangerouslySetInnerHTML={{ __html: item.tekst}}></div>
            </div>
  
        </div>);
    }
    return '';
  }


  render() {
    return (
      <div>

        <form onSubmit={this.mySubmitHandler}>
          <p>Please provide either HAPI-id or code from a code system</p>
          <input
            id="id"
            type='text'
            autoComplete="off"
            placeholder="HAPI-id"
            value={this.state.uglyId}
            onChange={evt => this.myChangeHandler(evt)}
          />

          <span className="marginRight">or</span>
            <input
            id="codeSystem"
            type='text'
            autoComplete="off"
            placeholder="Code system"
            value={this.state.codeSystem}
            onChange={evt => this.ChangeHandlerCodeSystem(evt)}
          />

           <input
            type='text'
            autoComplete="off"
            id="code"
            placeholder="Code"
            value={this.state.code}
            onChange={evt => this.ChangeHandlerCode(evt)}
          />

          <input
            type='submit'
            value="поиск"
          />
        </form>

        <div><pre>{this.state.response}</pre></div>
        <div>here is the HTML part</div>

        <div>{this.renderJson()}</div>
        <div>{this.state.url}</div>

      </div>
    );
  }

}

ReactDOM.render(<MyPage />, document.getElementById('root'));

reportWebVitals();