import React from 'react';
import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <span className="msg">Oops! Something went wrong!</span>
    </div>
  );
};

export default ErrorIndicator;
