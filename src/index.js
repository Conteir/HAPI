import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

/*const mysecondelement = (
<ul>
  <h1>Put your request here:</h1>
  <textarea for="inputId" id="inputId" placeholder="yes, here..."></textarea>
  <button onclick="activateLasers()">Send the request</button>
</ul>
);
*/


//const myfirstelement = <button onclick="activateLasers()">Send</button>

 /* const textcomponent = () => (
  <div>
    <h1>Put your request here:</h1>
  </div>
);

const areacomponent = () => (
  <div>
    <textarea for="inputId" id="inputId" placeholder="yes, here..."></textarea>
  </div>
);

const buttoncomponent = () => (
  <div>
    <button onclick="activateLasers()">Send the request</button>
  </div>
);

ReactDOM.render(
  <div>
    <textcomponent />
    <areacomponent />
    <buttoncomponent />
  </div>, document.getElementById("root")
);
*/


/*
const buttoncomponent = () => {
  const handleClick = () => console.log('here');
    return (
      <div>
        <button onClick={handleClick}>Click here:</button>
      </div>
  );
};

const TextAreaComponent = () => {
  const [textAreaComponentValue, setTextAreaComponentValue] = useState<string>("");
    return (
      <textarea 
        value={textAreaComponentValue} 
        onChange={(
          ev: React.ChangeEvent<HTMLTextAreaElement>,
          ) : void => setTextAreaComponentValue(ev.target.value)}
      />
    );
};

const textcomponent = () =>
  <p>Put here</p>
;

ReactDOM.render(
  <div>
    <textcomponent />
    <areacomponent />
    <buttoncomponent />
  </div>,
  document.querySelector('#root')
);
*/


/*
ReactDOM.render(
  const mysecondelement = <h1>Send</h1>;
, document.getElementById('root')
  );*/

  /*<React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


class MyPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      uglyId: '',
      response: ''
    };

  }

  /* componentDidMount() {
    fetch('https://api.helsedirektoratet.no/innhold/innhold?q=react')
        .then(response => response.json())
        .then(data => this.setState({ uglyId: data.total }) );
  }; */
  
  mySubmitHandler = (event) => {
    event.preventDefault();
    //alert("You are sending " + this.state.uglyId);
    fetch('https://api.helsedirektoratet.no/innhold/innhold/' + this.state.uglyId,
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

  render() {
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
          <p>Put your id, and submit:</p>
          <input
            type='text'
            value={this.state.uglyId}
            onChange={evt => this.myChangeHandler(evt)}
          />
          <input
            type='submit'
          />
        </form>
        <div><pre>{this.state.response}</pre></div>
      </div>
    );
  }

}

ReactDOM.render(<MyPage />, document.getElementById('root'));

reportWebVitals();