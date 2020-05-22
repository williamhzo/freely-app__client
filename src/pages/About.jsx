import React from 'react';
import { Link } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';

import '../styles/About.scss';

const About = () => {
  return (
    <div className="about">
      <h1 className="about__title">
        Freely <span className="about__title--span">is the</span> freelancer
        platform <span className="about__title--span">for</span> freelancers
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
          <Link className="about__link-inline" to="/">
            @williamhermozo
          </Link>{' '}
          and
          <Link className="about__link-inline" to="/">
            @samlittlefair
          </Link>
          , or send a message via the contact form below.
        </p>
        <p className="about__text">
          Freely is built with the MERN (MongoDB, Express, React, and Node).
        </p>
        <h2 className="about__subtitle">Contact Us</h2>
        <p className="about__text">
          Notice a bug? Have a suggestion? Want to talk? Send a message with the
          form below:
        </p>
        <form className="about__form">
          <input className="about__input" type="text" name="email" />
          <TextareaAutosize />
        </form>
      </div>
    </div>
  );
};

export default About;
