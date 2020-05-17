import React from 'react';

const FreelancerSkill = ({ skill }) => {
  return (
    <div className="skill-tag">
      <p className="skill-tag__title">{skill.name}</p>
    </div>
  );
};

export default FreelancerSkill;
