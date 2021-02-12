import React, { Component } from "react";
import "./Modal.css";
import "../../../hoc/Auxx";
import Aux from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //return boolean value
  }
  componentDidUpdate() {
    console.log("Model updated!!");
  }
  render() {
    return (
      <Aux>
        <Backdrop Show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            //if props.show will true then "translateY(0)" else "translateY(-100vh)"
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
