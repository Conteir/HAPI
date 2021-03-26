/*'use strict';

import React from 'react';
import './App.css';


const e = React.createElement;

class button extends React.Component {
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