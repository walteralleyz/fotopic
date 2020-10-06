import React from 'react';

const Input = ({ type, value, changer, text, name, list}) => (
    <div className='form__holder--input'>
        <label htmlFor={name}>{name}</label>
        <input
            className='form__input'
            type={type}
            value={value}
            onChange={changer}
            id={name}
            placeholder={text}
            list={list}
        />
    </div>
);

export default Input;