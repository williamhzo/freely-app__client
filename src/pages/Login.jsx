import React, { Component } from 'react';
import UserContext from '../components/Auth/UserContext';
import { withRouter, Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

class Login extends Component {
  static contextType = UserContext;

  state = {
    accountExists: false,
  };

  handleChange = (event) => {
    const { key, value } = event.target;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // if user exists
    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        // form validation !!!
      });

    // else
    // apiHandler
    //   .signup(this.state)
    //   .then((data) => {
    //     this.context.setUser(data);
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <React.Fragment>
        {/* default option --> sign up (create account) */}
        {!this.state.accountExists && (
          <React.Fragment>
            <h2>Join us in our world!</h2>
            <form
              onChange={this.handleChange}
              onSubmit={this.handleCreateAccount}
            >
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
              <button>Submit</button>
            </form>
          </React.Fragment>
        )}
        {/* if user doesn't have an account --> sign up (create account) */}
        {this.state.accountExists && (
          <React.Fragment>
            <h2>
              Welcome back!{' '}
              <span role="img" aria-label="waving-emoji">
                👋
              </span>
            </h2>
            <form onChange={this.handleChange} onSubmit={this.handleLogIn}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
              <button>Submit</button>
            </form>
          </React.Fragment>
        )}
        <Link>Already have an account? Log in right here!</Link>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
