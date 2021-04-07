import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = class Loader extends React.Component {
   
    render () {
        return (
          <div>
            <div>{Loader}</div>
          </div>
        );
      }

    Loader = () => {
        return (
                
            <div>
                <Spinner color="success" />
            </div>

        );
    }

}

export default Loader;