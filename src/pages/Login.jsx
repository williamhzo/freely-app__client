import React, { Component } from 'react';
import UserContext from '../components/Auth/UserContext';
import { withRouter, Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
  static contextType = UserContext;

  state = {
    accountExists: false,
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
          <h2>
            Welcome back!{' '}
            <span role="img" aria-label="waving-emoji">
              👋
            </span>
          </h2>
        )}
        {!this.state.accountExists && (
          <h2>
            Hey! Create an account to set up your freelancer profile{' '}
            <span role="img" aria-label="arrow-emoji">
              ⬇️
            </span>
          </h2>
        )}
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {!this.state.accountExists && (
            <>
              <label htmlFor="username">Username</label>
              <input type="username" id="username" name="username" />
            </>
          )}
          <button>Submit</button>
        </form>
        {this.state.accountExists && (
          <Link onClick={this.handleClick}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Back
          </Link>
        )}
        {!this.state.accountExists && (
          <Link onClick={this.handleClick}>
            I already have an account{' '}
            <span role="img" aria-label="rocket-emoji">
              🚀
            </span>
          </Link>
        )}
      </>
    );
  }
}

export default withRouter(Login);
