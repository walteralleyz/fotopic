import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Nav from './nav';
import { routes } from '../helpers/routes';
import * as actions from '../actions/useraction';
import { isAuthenticated } from '../helpers/auth';

function Navbar({ user, toggleLogged }) {
    const title = { text: 'SuperLista', icon: 'market', description: 'titulo do site', route: routes.main };
    const [buyOption, setBuyOption] = useState({ text: 'Minhas Listas', icon: 'doc', description: 'minhas compras', route: routes.main});

    const options = user.logged 
    ? [
        buyOption,
        { text: 'Sair', icon: 'exit', description: 'sair', route: routes.signout}
    ] 
    : [
        { text: 'Sobre Nós', icon: 'book', description: 'sobre', route: '/about' },
        { text: 'Contato', icon: 'phone', description: 'contate-nos', route: '/contact' },
        { text: 'API', icon: 'laptop', description: 'api', route: '/api' }
    ];

    useEffect(() => {
        if(isAuthenticated('user')) {
            toggleLogged(true);
        }
    }, [toggleLogged]);

    useEffect(() => {
        if(window.location.pathname === '/')
            setBuyOption({ text: 'Nova Lista', icon: 'doc', description: 'nova lista compra', route: routes.new});
        else
            setBuyOption({ text: 'Minhas Listas', icon: 'doc', description: 'minhas compras', route: routes.main});
    }, []);

    return (
        <nav className='nav'>
            <Nav
                title={title}
                options={options}
            />
        </nav>
    )
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    toggleLogged: b => dispatch(actions.toggleLogged(b))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);