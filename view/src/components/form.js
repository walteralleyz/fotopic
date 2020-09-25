import React from 'react';

const Form = ({ children, title }) => (
    <form className='form' onSubmit={e => e.preventDefault()}>
        <h2 className='form__title'>{title}</h2>
        {children}
    </form>
);

export default Form;