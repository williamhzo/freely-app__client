import React from 'react';

const HamburgerButton = (props) => {
  // console.log(props);
  let linesClassName = ['hamburger-btn__line'];
  if (props.hamburgerToggle) {
    linesClassName.push('animate');
  }
  // console.log(linesClassName);
  return (
    <button className="hamburger-btn" onClick={props.click}>
      <div className={linesClassName.join(' ')}></div>
      <div className={linesClassName.join(' ')}></div>
      <div className={linesClassName.join(' ')}></div>
    </button>
  );
};

export default HamburgerButton;
