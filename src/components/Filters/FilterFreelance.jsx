import React from 'react';

const FilterFreelance = () => {
  return (
    <form className="filter" action="">
      <div className="filter__group">
        <label className="filter__label" htmlFor="city">
          City
        </label><br></br>
        <input className="filter__input" name="city" id="city" type="text" />
      </div>
      <div className="filter__group">
        <label className="filter__label" htmlFor="category">
          Category
        </label><br></br>
        <input
          className="filter__input"
          type="text"
          name="category"
          id="category"
        />
      </div>
      <div className="filter__group">
        <label className="filter__label" htmlFor="skills">
          Skill
        </label><br></br>
        <input
          className="filter__input"
          type="text"
          name="skills"
          id="skills"
        />
      </div>
    </form>
  );
};

export default FilterFreelance;
