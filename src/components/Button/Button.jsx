import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={() => onClick()}>
      Завантажити більше
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
