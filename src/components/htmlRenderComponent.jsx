import React from 'react';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from "react-collapsible-component";

export const HTMLRender = class HTMLRender extends React.Component {



  render () {
    return (
      <div>
        <div>{this.renderJson()}</div>
      </div>
    );
  }

  renderJson() {
    if (this.props.data) {
      let json = JSON.parse(this.props.data);

      if (Array.isArray(json)) {
        return json.map((item, index) =>
          <div key={index}>

            <div><h1>{item.tittel}</h1></div>
            <div dangerouslySetInnerHTML={{ __html: item.tekst }}></div>
            <CollapsibleComponent name={item.id}> 
              {item.data.rasjonale != null ? <CollapsibleHead><h2>Rasjonale</h2></CollapsibleHead>:null} 

              <CollapsibleContent>
                <div dangerouslySetInnerHTML={{ __html: item.data.rasjonale }}></div>
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
            {item.data.rasjonale != null ? <CollapsibleHead><h2>Rasjonale</h2></CollapsibleHead> : null} 
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
                    <td style={{ fontWeight: "bold" }}>Code system ICPC-2</td><td>{item.koder && item.koder['ICPC-2'] ? item.koder['ICPC-2'][0] : ''}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "bold" }}>Code system ICD-10</td><td>{item.koder && item.koder['ICD-10'] ? item.koder['ICD-10'][0] : ''}</td>
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
                  
                  {
                    Array.isArray(item.links) ? 
                    <tr>
                      <td colSpan="2">{this.renderLinks(item.links)}</td>
                    </tr>
                    : null
                  }

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
    if (links != null)
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

}
export default HTMLRender;