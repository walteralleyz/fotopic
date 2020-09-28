import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Nav from './nav';
import { routes } from '../../helpers/routes';
import * as userAction from '../../actions/useraction';
import { isAuthenticated } from '../../helpers/auth';

function Navbar({ user, toggleLogged }) {
    const title = { text: 'SuperLista', icon: 'market', description: 'titulo do site', route: routes.main };

    const options = user.logged 
    ? [
        { text: 'Nova Lista', icon: 'doc', description: 'minhas compras', route: routes.new},
        { text: 'Sair', icon: 'exit', description: 'sair', route: routes.signout}
    ] 
    : [
        { text: 'Sobre Nós', icon: 'book', description: 'sobre', route: '/about' },
        { text: 'Criar Conta', icon: 'laptop', description: 'criar', route: '/signup' }
    ];

    useEffect(() => {
        if(isAuthenticated('user')) {
            toggleLogged(true);
        }
    }, [toggleLogged]);

    return (
        <Nav
            title={title}
            options={options}
        />
    )
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    toggleLogged: b => dispatch(userAction.toggleLogged(b))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);