import React, { Component } from "react";
//import "./ChatInput.scss";

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <input onKeyDown={this.props.send} />
      </div>
    );
  }
}

export default Input;