import React from 'react';
import { Link } from 'react-router-dom';

// import FreelancerSkill from './FreelancerSkill';

const FreelancerCard = ({ freelancer }) => {
  const styleProfilePic = {
    backgroundImage: `url('${freelancer.profilePicture}')`,
  };
  return (
    <Link className="card" to={`/${freelancer.userName}`}>
      <div style={styleProfilePic} className="card__aside"></div>
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
        <p className="card__copy">{freelancer.location}</p>
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
