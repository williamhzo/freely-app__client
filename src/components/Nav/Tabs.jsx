import React from 'react';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
  return (
    <div className="tabs">
      <div className="tabs__item">
        <NavLink activeClassName="tab--active" to="/">
          Freelancers
        </NavLink>
      </div>
      <div className="tabs__item">
        <NavLink activeClassName="tab--active" to="/collabs">
          Collaborations
        </NavLink>
      </div>
    </div>
  );
};

export default Tabs;
