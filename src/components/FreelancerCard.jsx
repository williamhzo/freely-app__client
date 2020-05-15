import React from 'react';

const FreelancerCard = ({ freelancer }) => {
  return (
    <div className="card-frl">
      <div className="card-frl__aside">
        <div className="card-frl__img">
          <img src={freelancer.profilePicture} alt="Profile" />
        </div>
      </div>
      <div className="card-frl__body">
        <h1 className="card-frl__title">{freelancer.userCategory.name}</h1>
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
