import React from "react";
import { connect } from "react-redux";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { flipModal } = this.props;
    return (
      <div className="side signUp" onClick={() => flipModal()}>
        <h3>Welcome to Grace Shopper</h3>
      </div>
    );
  }
}

export default connect((state) => state)(SignUpForm);
