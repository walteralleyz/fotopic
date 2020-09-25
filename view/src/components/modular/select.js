import React from 'react';

const Select = ({ value, changer, name, options}) => (
    <div className='form__holder--input'>
        <label htmlFor={name}>{name}</label>
        <select
            className='form__input'
            value={value}
            onChange={changer}
            id={name}
        >
            {options.map((option, i) => 
                <option key={`select-option-${i}`}
                    value={option.value}
                >{option.text}</option>
            )}
        </select>
    </div>
);

export default Select;