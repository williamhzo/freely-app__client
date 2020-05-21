import React, { Component } from 'react';
import UserContext from '../components/Auth/UserContext';
import { withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import '../styles/Login.scss';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {
  static contextType = UserContext;

  state = {
    accountExists: false,
    usernameAvailable: true,
    name: '',
    userName: '',
    email: '',
    password: '',
    formErrors: {
      name: '',
      userName: '',
      email: '',
      password: '',
    },
    credentialsError: '',
  };

  handleClick = () => {
    this.setState((prevState) => ({ accountExists: !prevState.accountExists }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    if (!this.state.accountExists) {
      switch (name) {
        case 'name':
          formErrors.name =
            value.length < 3 ? 'Name must be at least 3 characters long' : '';
          break;
        case 'email':
          value.length > 3 &&
            (formErrors.email = emailRegex.test(value)
              ? ''
              : 'Please enter a valid email address');
          break;
        case 'userName':
          value.length > 3 &&
            (formErrors.userName = e.target.value.match(/^[a-zA-Z0-9_]{3,15}$/)
              ? ''
              : "Username must be 3-15 characters long (you can add '_' and/or numbers)");
          break;
        case 'password':
          value.length > 2 &&
            (formErrors.password =
              value.length < 5
                ? 'Password should be at least 5 characters long'
                : '');
          break;
        default:
          break;
      }
      this.setState({ [name]: value, formErrors });
    } else {
    }
  };

  handleUsername = (e) => {
    if (
      e.target.value.match(
        /^(about|user|collab|collabs|messages|message|edit|login|signup|freely)$/i
      )
    ) {
      this.setState({ usernameAvailable: false });
    }

    apiHandler.getUser('userName', e.target.value).then((apiRes) => {
      if (apiRes.length > 0) {
        this.setState({ usernameAvailable: false });
      } else {
        this.setState({ usernameAvailable: true });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, userName } = this.state;
    if (this.state.accountExists) {
      apiHandler
        .signin({ email, password })
        .then((data) => {
          this.context.setUser(data);
          this.props.history.push('/');
        })
        .catch((error) => {
          this.setState({ credentialsError: 'Invalid credentials' });
        });

      return;
    } else {
      if (formValid(this.state)) {
        apiHandler
          .signup({ email, password, name, userName })
          .then((data) => {
            this.context.setUser(data);
            console.log(data._id);
            this.props.history.push('/' + data.userName + '/edit');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="login-container">
        {this.state.accountExists && (
          <h2 className="form-login__title">
            Welcome back!{' '}
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
                <p className="form-login__error-msg">{formErrors.name}</p>
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
                {this.state.usernameAvailable && (
                  <p className="form-login__error-msg">{formErrors.userName}</p>
                )}
                {!this.state.usernameAvailable && (
                  <p className="form-login__error-msg">
                    Sorry, this username is already taken
                  </p>
                )}
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
            {!this.state.accountExists && (
              <p className="form-login__error-msg">{formErrors.email}</p>
            )}
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
              placeholder={this.state.accountExists ? null : '5+ characters'}
            />
            {!this.state.accountExists && (
              <p className="form-login__error-msg">{formErrors.password}</p>
            )}
          </div>
          <div className="form-login__button-group">
            <button className="form-login__button">
              {this.state.accountExists ? 'Log in' : 'Create Account'}
            </button>
            {this.state.accountExists && (
              <p className="form-login__error-msg credentials">
                {this.state.credentialsError}
              </p>
            )}
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
