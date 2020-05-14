import React, { Component } from 'react';
import UserContext from '../components/Auth/UserContext';
import { withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import '../styles/Login.scss';

class Login extends Component {
  static contextType = UserContext;

  state = {
    accountExists: false,
    email: '',
    username: '',
    password: '',
  };

  handleClick = () => {
    this.setState({ accountExists: !this.state.accountExists });
  };

  handleChange = (event) => {
    const { key, value } = event.target;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.accountExists) return this.logUser();
    this.createAccount();
  };

  logUser = () => {
    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createAccount = () => {
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        {this.state.accountExists && (
          <h2 className="form__title">
            Welcome back!{' '}
            <span role="img" aria-label="waving-emoji">
              👋
            </span>
          </h2>
        )}
        {!this.state.accountExists && (
          <h2 className="form__title">
            Hey! Create an account to set up your freelancer profile <br></br>
            <span role="img" aria-label="arrow-emoji">
              ⬇️
            </span>
          </h2>
        )}
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          {!this.state.accountExists && (
            <>
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <br></br>
              <input
                className="form__input"
                type="name"
                id="name"
                name="name"
              />
              {/* <br></br> */}
              <label className="form__label" htmlFor="username">
                Username
              </label>
              <br></br>
              <input
                className="form__input"
                type="username"
                id="username"
                name="username"
              />
              <br></br>
            </>
          )}
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <br></br>
          <input className="form__input" type="email" id="email" name="email" />
          <br></br>
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <br></br>
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
            placeholder="5+ characters"
          />

          {this.state.accountExists ? (
            <button className="form__button">Log in</button>
          ) : (
            <button className="form__button">Create Account</button>
          )}
        </form>
        {this.state.accountExists && (
          <h3 className="form__link" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </h3>
        )}
        {!this.state.accountExists && (
          <h3 className="form__link" onClick={this.handleClick}>
            I already have an account{' '}
            <span role="img" aria-label="rocket-emoji">
              🚀
            </span>
          </h3>
        )}
      </>
    );
  }
}

export default withRouter(Login);
