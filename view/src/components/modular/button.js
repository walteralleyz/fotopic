import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, color, size, text, handler }) => (
    <button
        className={`button button--${color} button--${size}`}
        type={type}
        onClick={handler}
    >{text}</button>
);

Button.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string,
    handler: PropTypes.func
};

Button.defaultProps = {
    handler: () => null,
    type: 'button',
    color: 'blue',
    size: 'small',
    text: 'Enviar'
};

export default Button;