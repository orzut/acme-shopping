import React from "react";
import { connect } from "react-redux";
import { login } from "./store";
import "./SignInForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailIsInvalid: false,
      passwordIsInvalid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
      emailIsInvalid: false,
      passwordIsInvalid: false,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".com") ||
      this.state.email.length === 0
    ) {
      this.setState({ emailIsInvalid: true });
      return;
    }
    if (this.state.password.length === 0) {
      this.setState({ passwordIsInvalid: true });
      return;
    }
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(credentials);
  }

  render() {
    const { flipModal, session } = this.props;
    const { email, password, emailIsInvalid, passwordIsInvalid } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div id="signIn" className="side signIn">
        <h2>WELCOME BACK</h2>
        <h4>SIGN IN BELOW</h4>
        <form onSubmit={onSubmit}>
          <TextField
            name="email"
            label="Email"
            size="small"
            onChange={onChange}
            value={email}
            error={emailIsInvalid}
            helperText={
              emailIsInvalid ? "Required field. Must include '@'" : " "
            }
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            size="small"
            onChange={onChange}
            value={password}
            error={passwordIsInvalid}
            helperText={passwordIsInvalid ? "Required field" : " "}
          />
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
        </form>
        <p>DON&apos;T HAVE AN ACCOUNT?</p>
        <p>
          SIGN UP
          <span onClick={() => flipModal()}> HERE </span>
        </p>
        {session.invalidLogin ? <p>INVALID EMAIL OR PASSWORD</p> : null}
      </div>
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

export default connect((state) => state, mapDispatch)(SignInForm);
