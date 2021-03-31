import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

class MyPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      uglyId: '',
      codeSystemICD: '', 
      codeICD: '',
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
    } else if(this.state.codeSystemICD && this.state.codeICD) {
      url += '?kodeverk=' + this.state.codeSystemICD + "&kode=" + this.state.codeICD;
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
  
      if(Array.isArray(json)) {
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
                <td>Title</td><td>{item.tittel ? item.tittel : ''}</td>
              </tr>

              <tr>
                <td>FirstPublicated</td><td>{item.forstPublisert ? item.forstPublisert : ''}</td>
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
      } else {
      let item = json;
      return (
        <div>
  
          <table><tbody>
  
              <tr>
                <td style={{fontWeight: "bold"}}>Id</td><td>{item.id ? item.id : ''}</td>
              </tr>
  
              <tr>
                <td style={{fontWeight: "bold"}}>Title</td><td>{item.tittel ? item.tittel : ''}</td>
              </tr>
  
              <tr>
                <td>Owner</td><td>{item.eier ? item.eier : ''}</td>
              </tr>
  
              <tr>
                <td>FirstPublicated</td><td>{item.forstPublisert ? item.forstPublisert : ''}</td>
              </tr>
  
              <tr>
                <td style={{fontWeight: "bold"}}>intro</td><td>{item.intro ? item.intro : ''}</td>
              </tr>
  
              <tr>
                <td style={{fontWeight: "bold"}}>grouppeID</td><td>{item.gruppeId ? item.gruppeId : ''}</td>
              </tr>
  
            </tbody></table>
  
            <div className="content">
              <div><h1>{item.tittel}</h1></div>
              <div dangerouslySetInnerHTML={{ __html: item.tekst}}></div>
        
              <div dangerouslySetInnerHTML={{ __html: item.data.rasjonale}}></div>
  
            </div>
  
        </div>);
      }
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


        <div>{this.renderJson()}</div>
        <div>here is the 2 part</div>

        <div><pre>{this.state.response}</pre></div>

        <div>{this.state.url}</div>

      </div>
    );
  }

}

ReactDOM.render(<MyPage />, document.getElementById('root'));

reportWebVitals();