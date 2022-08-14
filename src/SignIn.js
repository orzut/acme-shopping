import React, { Component } from "react";
import { login } from "./store";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.login(this.state);
  }
  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <input name="email" onChange={onChange} value={email} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(null, mapDispatch)(SignIn);
