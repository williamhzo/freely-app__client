import React from 'react';

const FilterCollab = () => {
  return (
    <form className="filter-group" action="">
      <label htmlFor="city">City</label>
      <input name="city" id="city" type="text" />
      <br></br>
      <label htmlFor="category">Category</label>
      <input type="text" name="category" id="category" />
    </form>
  );
};

export default FilterCollab;
