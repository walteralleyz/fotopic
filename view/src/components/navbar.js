import React from 'react';

import Nav from './nav';
import { routes } from '../helpers/routes';

export default function Navbar() {
    const title = { text: 'SuperLista', icon: 'market', description: 'titulo do site', route: routes.main };
    const options = [
        { text: 'Sobre Nós', icon: 'book', description: 'sobre', route: '/about' },
        { text: 'Contato', icon: 'phone', description: 'contate-nos', route: '/contact' },
        { text: 'API', icon: 'laptop', description: 'api', route: '/api' }
    ];

    return (
        <nav className='nav'>
            <Nav
                title={title}
                options={options}
            />
        </nav>
    )
};