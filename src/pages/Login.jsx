import React, { Component } from "react";
import UserContext from "../components/Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../api/apiHandler";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import "../styles/Login.scss";

class Login extends Component {
  static contextType = UserContext;

  state = {
    accountExists: false,
    usernameAvailable: false,
    name: "",
    userName: "",
    email: "",
    password: "",
    formError: "",
  };

  handleClick = () => {
    this.setState((prevState) => ({ accountExists: !prevState.accountExists }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUsername = (e) => {
    if (
      !e.target.value.match(/^[a-zA-Z0-9_]{3,10}$/) ||
      e.target.value.match(
        /^(about|user|collab|collabs|messages|message|edit|login|signup|freely)$/i
      )
    ) {
      this.setState({ usernameAvailable: false });
      return;
    }
    apiHandler.getUser("userName", e.target.value).then((apiRes) => {
      if (apiRes.length > 0) {
        this.setState({ usernameAvailable: true });
      } else {
        this.setState({ usernameAvailable: true });
      }
    });
  };

  isValid = () => {
    let errorMessage = "";
    if (!this.state.name) {
      this.setState({ formError: "You forgot your name!" });
    } else if (!this.state.userName) {
      this.setState({ formError: "You forgot your username!" });
    } else if (!this.state.email.includes("@")) {
      this.setState({ formError: "Please enter a valid email." });
    } else if (errorMessage) {
      this.setState({ formError: errorMessage });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.formError);
    if (this.isValid()) {
      if (this.state.accountExists) return this.logUser();
      this.createAccount();
    }
  };

  logUser = () => {
    const { email, password } = this.state;
    apiHandler
      .signin({ email, password })
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createAccount = () => {
    const { email, password, name, userName } = this.state;
    apiHandler
      .signup({ email, password, name, userName })
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/" + data._id + "/edit");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="login-container">
        {this.state.accountExists && (
          <h2 className="form-login__title">
            Welcome back!{" "}
            <span role="img" aria-label="waving-emoji">
              👋
            </span>
          </h2>
        )}
        {!this.state.accountExists && (
          <h2 className="form-login__title">
            Create an account to set up your freelancer profile
          </h2>
        )}
        <form
          className="form-login"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          {!this.state.accountExists && (
            <>
              <div className="form-login__group">
                <label className="form-login__label" htmlFor="name">
                  Name
                </label>
                <br></br>
                <input
                  className="form-login__input"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-login__group">
                <label className="form-login__label" htmlFor="userName">
                  Username
                </label>
                <br></br>
                <input
                  className="form-login__input"
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={this.handleUsername}
                />
              </div>
            </>
          )}
          <div className="form-login__group">
            <label className="form-login__label" htmlFor="email">
              Email
            </label>
            <br></br>
            <input
              className="form-login__input"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="form-login__group">
            <label className="form-login__label" htmlFor="password">
              Password
            </label>
            <br></br>
            <input
              className="form-login__input"
              type="password"
              id="password"
              name="password"
              placeholder={this.state.accountExists ? null : "5+ characters"}
            />
          </div>
          <p className="form-login__error-msg">{this.state.formError}</p>
          <div className="form-login__button-group">
            <button className="form-login__button">
              {this.state.accountExists ? "Log in" : "Create Account"}
            </button>
          </div>
        </form>
        <div className="form-login__link">
          {this.state.accountExists && (
            <>
              <h3 onClick={this.handleClick}>Don't have an account yet?</h3>
              <h3 onClick={this.handleClick}>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
              </h3>
            </>
          )}
          {!this.state.accountExists && (
            <h3 onClick={this.handleClick}>I already have an account </h3>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
