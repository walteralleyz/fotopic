import React from 'react';

import Error from '../images/error.svg';

export default function NotFound() {
    return (
        <div className='holder--404'>
            <h1 className='text-danger'>404</h1>
            <p>Não encontrado!</p>

            <img src={Error} alt='Not Found' />
        </div>
    )
}