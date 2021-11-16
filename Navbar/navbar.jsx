import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3">
          {/* <a className="navbar-brand" href="#">
            Total Items{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </a> */}
          <br />
          <a className="navbar-brand" href="./register">
            CREATE-USER{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </a>
          {/* <button className="navbar-brand" >
            CREATE-USER{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </button> */}
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
