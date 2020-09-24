import React from 'react';

const Form = ({ children, title }) => (
    <form className='form'>
        <h2 className='form__title'>{title}</h2>
        {children}
    </form>
);

export default Form;