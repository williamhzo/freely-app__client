import React from 'react';
import { Link } from 'react-router-dom';

// import FreelancerSkill from './FreelancerSkill';

const FreelancerCard = ({ freelancer }) => {
  return (
    <Link className="card" to={`/${freelancer.userName}`}>
      <div
        style={{ backgroundImage: `url(${freelancer.profilePicture})` }}
        className="card__aside"
      ></div>
      <div className="card__body">
        <h3 className="card__title">
          {freelancer.userCategory.map((el, index) => (
            <div key={index}>{el.name}</div>
          ))}
        </h3>
        {/* <div className="card__skills">
          {freelancer.userSkills.map((skill, index) => (
            <FreelancerSkill key={index} skill={skill} />
          ))}
        </div> */}
        <h2 className="card__subtitle">{freelancer.name}</h2>
        <p className="card__copy--location">{freelancer.location}</p>
        <p className="card__copy">
          {freelancer.remote
            ? "I don't mind working remotely."
            : 'I prefer working on site.'}
        </p>
      </div>
    </Link>
  );
};

export default FreelancerCard;
