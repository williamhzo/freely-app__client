import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsCard = () => {
  return (
    <div className="card card-about">
      <h1 className="about__title card-about__title">
        <span className="about__title--span card-about-span--bold">Freely</span>{' '}
        <span className="about__title--span-bis card-about-span-bis">
          is the
        </span>{' '}
        <span className="about__title--span card-about-span--lora">
          freelance platform
        </span>{' '}
        <span className="about__title--span-bis card-about-span-bis">for</span>{' '}
        <span className="about__title--span card-about-span--lora">
          freelancers
        </span>
      </h1>
      <Link className="card-about__link" to="/about">
        How it Works <span className="card-about__chevron">></span>
      </Link>
    </div>
  );
};

export default AboutUsCard;
