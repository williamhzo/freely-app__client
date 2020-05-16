import React from 'react';
// import FreelancerSkill from './FreelancerSkill';

const FreelancerCard = ({ freelancer }) => {
  const styleProfilePic = {
    backgroundImage: `url('${freelancer.profilePicture}')`,
  };

  return (
    <div className="card-frl">
      <div style={styleProfilePic} className="card-frl__aside"></div>
      <div className="card-frl__body">
        <h3 className="card-frl__title">
          {freelancer.userCategory.map((el, index) => (
            <div key={index}>{el.name}</div>
          ))}
        </h3>
        {/* <div className="card-frl__skills">
          {freelancer.userSkills.map((skill, index) => (
            <FreelancerSkill key={index} skill={skill} />
          ))}
        </div> */}
        <h2 className="card-frl__subtitle">{freelancer.name}</h2>
        <p className="card-frl__copy">{freelancer.location}</p>
        <p className="card-frl__copy">
          {freelancer.remote
            ? "I don't mind working remotely."
            : 'I prefer working on site.'}
        </p>
      </div>
    </div>
  );
};

export default FreelancerCard;
