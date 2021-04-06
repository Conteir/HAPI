import React from 'react';


export const renderLinks = class renderLinks extends React.Component { 

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