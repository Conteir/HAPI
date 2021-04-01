import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from "react-collapsible-component";


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
    } else if (this.state.codeSystem && this.state.code) {
      url += '?kodeverk=' + this.state.codeSystem + "&kode=" + this.state.code;
    } else {
      url += this.state.uglyId;
    }

    this.setState({ url: url });

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Ocp-Apim-Subscription-Key': '89b72a3ad5cf4723b3f489c3eb4d82a1'
        }
      }
    )
      .then(response => response.json())
      .then(data => this.responseHandler(data));
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

  renderJson() {
    if (this.state.response) {
      let json = JSON.parse(this.state.response);
      console.log(json);

      if (Array.isArray(json)) {
        console.log(json);
        return json.map((item, index) =>
          <div key={index}>


            <div><h1>{item.tittel}</h1></div>
            <div dangerouslySetInnerHTML={{ __html: item.tekst }}></div>
            <CollapsibleComponent name={item.id}>
              <CollapsibleHead><h2>Rasjonale</h2></CollapsibleHead>
              <CollapsibleContent><div dangerouslySetInnerHTML={{ __html: item.data.rasjonale }}></div>
              </CollapsibleContent>
              <CollapsibleHead><h2>Metadata</h2></CollapsibleHead>
              <CollapsibleContent>
                <table><tbody>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Id</td><td>{item.id ? item.id : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>intro</td><td>{item.intro ? item.id : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Owner</td><td>{item.eier ? item.eier : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>FirstPublicated</td><td>{item.forstPublisert ? item.forstPublisert : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>DokumentType</td><td>{item.dokumentType ? item.dokumentType : ''}</td>
                  </tr>

                </tbody></table>
                </CollapsibleContent>
                </CollapsibleComponent>

          </div>);
      } else {
        //if object (checking)
        let item = json;
        console.log(Array.isArray(item));
        console.log('object');

        return (
          <div>


            <div><h1>{item.tittel}</h1></div>
            <div dangerouslySetInnerHTML={{ __html: item.tekst }}></div>
            <CollapsibleComponent>
              <CollapsibleHead><h2>Rasjonale</h2></CollapsibleHead>
              <CollapsibleContent><div dangerouslySetInnerHTML={{ __html: item.data.rasjonale }}></div></CollapsibleContent>
              <CollapsibleHead><h2>Metadata</h2></CollapsibleHead>
              <CollapsibleContent>
                <table><tbody>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Id</td><td>{item.id ? item.id : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Owner</td><td>{item.eier ? item.eier : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>FirstPublicated</td><td>{item.forstPublisert ? item.forstPublisert : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>intro</td><td>{item.intro ? item.intro : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>grouppeID</td><td>{item.gruppeId ? item.gruppeId : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Code system</td><td>{item.koder.ICPC - 2}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Code system</td><td>{item.koder.ICD - 10}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Technical data</td><td>{item.tekniskeData ? '' : 'none'}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Info Id</td><td>{(item.tekniskeData && item.tekniskeData.infoId) ? item.tekniskeData.infoId : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Info type</td><td>{(item.tekniskeData && item.tekniskeData.infoType) ? item.tekniskeData.infoType : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Subtype</td><td>{(item.tekniskeData && item.tekniskeData.subType) ? item.tekniskeData.subType : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>HAPI id</td><td>{(item.tekniskeData && item.tekniskeData.HapiId) ? item.tekniskeData.HapiId : ''}</td>
                  </tr>

                  <tr>
                    <td colSpan="2">{this.renderLinks(item.links)}</td>
                  </tr>

                </tbody></table>

                <table><tbody>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Attachments</td><td>{item.attachments ? item.attachments : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Document type</td><td>{item.dokumentType ? item.dokumentType : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Last import to HAPI</td><td>{item.sistImportertTilHapi ? item.sistImportertTilHapi : ''}</td>
                  </tr>

                </tbody></table>
              </CollapsibleContent>
            </CollapsibleComponent>

          </div>);
      }
    }
    return '';
  }


  renderLinks(links) {
    return links.map((item, index) =>
      <div key={index}>

        <table><tbody>

          <tr>
            <td style={{ fontWeight: "bold" }}>Rel</td><td>{item.rel ? item.rel : ''}</td>
          </tr>

          <tr>
            <td style={{ fontWeight: "bold" }}>Type</td><td>{item.type ? item.type : ''}</td>
          </tr>

          <tr>
            <td>Href</td><td>{item.href ? item.href : ''}</td>
          </tr>

          <tr>
            <td>Struktur Id</td><td>{item.strukturId ? item.strukturId : ''}</td>
          </tr>


        </tbody></table>

      </div>);
  }


  render() {
    return (
      <div>

        <form onSubmit={this.mySubmitHandler}>
          <p>Please provide either HAPI-id or code from a code system</p>
          <input
            id="id"
            type='text'
            autoComplete="on"
            placeholder="HAPI-id"
            value={this.state.uglyId}
            onChange={evt => this.myChangeHandler(evt)}
          />

          <span className="marginRight">or</span>

          <select name="codeSystem" id="codeSystem"
            onChange={evt => this.ChangeHandlerCodeSystem(evt)}
          >
            <option value="" disabled selected hidden className="grey">Choose code system</option>
            <option value="ICD-10">ICD-10</option>
            <option value="ICPC-2">ICPC-2</option>
            <option value="ATC">ATC</option>
            <option value="SNOMED-CT">SNOMED-CT</option>
          </select>

          <input
            type='text'
            autoComplete="on"
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
        <div>here is the JSON part</div>
        <div><pre>{this.state.response}</pre></div>
        <div><pre><h4>{this.state.url}</h4></pre></div>

      </div>
    );
  }

}

ReactDOM.render(<MyPage />, document.getElementById('root'));

reportWebVitals();