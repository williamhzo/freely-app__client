import React from 'react';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
  return (
    <div className="tabs">
      <div className="tabs__item">
        <NavLink exact activeClassName="tabs--active" className='tabs__link' to="/">
          Freelancers
        </NavLink>
      </div>
      <div className="tabs__item">
        <NavLink exact activeClassName="tabs--active" className='tabs__link' to="/collabs">
          Collaborations
        </NavLink>
      </div>
    </div>
  );
};

export default Tabs;
