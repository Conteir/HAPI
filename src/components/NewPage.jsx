import React from "react";

export const NewPage = class NewPage extends React.Component {
      render() {
          return (
            <div className="newpage">
            <div className="container">
              <div className="row align-items-center my-5">
                <div className="col-lg-7">
                  <img
                    className="img-fluid rounded mb-4 mb-lg-0"
                    src="http://placehold.it/900x400"
                    alt=""
                  />
                </div>
                <div className="col-lg-5">
                  <h1 className="font-weight-light">This is a new page</h1>
                  <p>
                    Eirik geroj, Hanna geroj, so we are the heroes... not just for one day :)
                  </p>
                </div>
              </div>
            </div>
          </div>
          )
          
      }

}

export default NewPage;