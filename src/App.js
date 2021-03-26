//import React from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

//import logo from './logo.svg';
//import './App.css';

class App extends React.Component {
  
  /*constructor(props) {
    super(props);

    this.state = {  
      totalReactPackages: null
    };
  }
  */

  /*componentDidMount() {
    // GET request using fetch with set headers
    const headers = { 'Content-Type': 'application/json' }

    fetch('https://api.helsedirektoratet.no/innhold/kapitler?q=react', { headers })
        .then(response => response.json())
        .then(data => this.setState({ totalReactPackages: data.total }));
}*/

  render() {
    //const { totalReactPackages } = this.state;

    /*return (

      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          
          <a className="App-link">Learn React</a>
        </header>
        
      </div>
    );*/
    return <h1>some text...</h1>;
  }
}


/*const e = React.createElement;
class send_button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { send: false };
  }

  render() {

    if (this.state.send) {
      return 'You send this.';
    }
    
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Send'
    );
  }
}

const domContainer = document.querySelector('#send_button');
ReactDOM.render(e(send_button), domContainer);

const element = document.getElementById("textareaField");
*/

export default App;