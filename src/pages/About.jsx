import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';
import axios from 'axios';

import '../styles/About.scss';
import '../styles/Edit.scss';

class About extends Component {
  state = {
    email: '',
    body: '',
    sent: false,
    placeholder: 'Your message...',
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.sent) {
      return;
    }
    this.setState({ sent: true });
    let postUrl = `https://maker.ifttt.com/trigger/contact_form/with/key/csZ-cOLmY_ORGYx5OF5skW5EKdxlI10MI9NcGqZlElJ`;
    let encodedEmail = encodeURIComponent(this.state.email);
    let encodedMessage = encodeURIComponent(this.state.message);
    console.log(encodedEmail);
    console.log(encodedMessage);
    let encodedUrl =
      postUrl + `?value1="` + encodedEmail + `&value2="` + encodedMessage + `"`;
    axios
      .post(encodedUrl)
      .then((res) =>
        this.setState({
          email: '',
          message: '',
          sent: false,
          placeholder: 'Sent!',
        })
      )
      .catch((err) => {
        console.log(err);
        this.setState({
          email: '',
          message: '',
          sent: false,
          placeholder: 'Sent!',
        });
      });
  };
  render() {
    return (
      <div className="about container">
        <h1 className="about__title-main">
          Freely <span className="about__title-main--span">is the</span>{' '}
          freelancer platform{' '}
          <span className="about__title-main--span">for</span> freelancers
        </h1>
        <div className="about__body">
          <p className="about__text">
            There are a lot of freelancer platforms out there, but most of them
            are targeted at big companies looking to save costs with inexpensive
            labor. We wanted to build a freelancer platform that serves
            freelancers, not corporations.
          </p>
          <p className="about__text">
            That’s why we made Freely. It’s a place where freelancers can meet,
            share ideas, and team up.
          </p>
          <p className="about__text">How does it work?</p>
          <ol className="about__list">
            <li className="about__item">1. Put Yourself Out There</li>
            <p className="about__text">
              First, create a{' '}
              <Link className="about__link-inline" to="/">
                profile
              </Link>
              . This will let other freelancers discover you. It serves as your
              introduction and portfolio.
            </p>
            <li className="about__item">2. Connect With Other Freelancers</li>
            <p className="about__text">
              Browse{' '}
              <Link className="about__link-inline" to="/">
                profiles
              </Link>{' '}
              and{' '}
              <Link className="about__link-inline" to="/collabs">
                projects
              </Link>{' '}
              to see what other freelancers are working on. If you see someone
              working on something that interests you, send them a message. You
              can offer to collaborate, or just have a conversation.
            </p>
            <li className="about__item">3. Create Something</li>
            <p className="about__text">
              Do you have a great idea that you need some help with? Post a
              project. Include information about the project: what you have in
              mind, what roles and skills you need, and how you envision
              collaborating.
            </p>
          </ol>
          <h2 className="about__subtitle">Who are we?</h2>
          <p className="about__text">
            We are William Hermozo and Sam Littlefair. We’re students at the
            Ironhack Full-Stack Web Development Bootcamp in Paris, France. We
            created Freely for our final project. As of May 25, we are both
            looking for positions as web developers. If you’d like to get in
            touch, you can find us on LinkedIn:{' '}
            <Link className="about__link-inline" to="/william">
              @williamhermozo
            </Link>{' '}
            and
            <Link className="about__link-inline" to="/Sam">
              @samlittlefair
            </Link>
            , or send a message via the contact form below.
          </p>
          <p className="about__text">
            Freely is built with the MERN (MongoDB, Express, React, and Node).
          </p>
          <h2 className="about__subtitle">Contact Us</h2>
          <p className="about__text">
            Notice a bug? Have a suggestion? Want to talk? Send a message with
            the form below:
          </p>
          <form onSubmit={this.handleFormSubmit} className="about__form">
            <input
              onChange={this.handleEmailChange}
              value={this.state.email}
              className="about__email"
              type="text"
              name="email"
              placeholder="Your email address"
            />
            <div className="about__messagecontainer">
              <TextareaAutosize
                onChange={this.handleMessageChange}
                className="about__message"
                value={this.state.message}
                placeholder={this.state.placeholder}
              />
              <button className="about__send edit__button collabbutton unsaved">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default About;
