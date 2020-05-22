import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsCard = () => {
  return (
    <div className="card card-about">
      <h1 className="about__title card-about__title">
        Freely <span className="about__title--span card-about-span">is the</span> freelancer
        platform <span className="about__title--span card-about-span">for</span> freelancers
      </h1>
      <Link className="card-about__link" to="/about">
        How it Works <span className='card-about__chevron'>></span>
      </Link>
    </div>
  );
};

export default AboutUsCard;
