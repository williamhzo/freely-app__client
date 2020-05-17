import React from 'react';

const HamburgerButton = (props) => {
  return (
    <button className="hamburger-btn" onClick={props.click}>
      <div className="hamburger-btn__line"></div>
      <div className="hamburger-btn__line"></div>
      <div className="hamburger-btn__line"></div>
    </button>
  );
};

export default HamburgerButton;
