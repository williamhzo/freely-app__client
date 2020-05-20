import React from 'react';

const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={props.click}>
      <div className="backdrop__secondary" onClick={props.click}></div>
    </div>
  );
};

export default Backdrop;
