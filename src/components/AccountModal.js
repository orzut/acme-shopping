import React from "react";
import { connect } from "react-redux";
import "../AccountModal.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

class AccountModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.flipModal = this.flipModal.bind(this);
  }

  flipModal() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const { closeAccountModal } = this.props;
    const { isFlipped } = this.state;
    const { flipModal } = this;
    return (
      <div>
        <div className="modalBackground" onClick={() => closeAccountModal()} />
        <div className="modal">
          <div className={isFlipped ? "isFlipped sides" : "sides"}>
            <SignInForm flipModal={flipModal} />
            <SignUpForm flipModal={flipModal} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(AccountModal);
