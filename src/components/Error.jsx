import React, { Component } from "react";
import "../styles/Error.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Error extends Component {
  render() {
    return (
      <div className="error">
        <FontAwesomeIcon
          className="error__clear"
          onClick={this.props.handleError}
          icon={faTimes}
        />
        <p className="error__title">Error</p>
        <p>{this.props.error}</p>
      </div>
    );
  }
}
