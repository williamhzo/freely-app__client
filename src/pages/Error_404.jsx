import React from 'react';

const Error_404 = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">
        Woooops<br></br>
        <span>four-oh-four</span>
      </h1>
      <img
        src="./media/error_404.svg"
        alt="error page palm-tree not-found"
        className="error-page__image"
      />
      <div className="error-page__body">
        <p>wtf did you type in the URL?!</p>
        <h3>Back home</h3>
      </div>
    </div>
  );
};

export default Error_404;
