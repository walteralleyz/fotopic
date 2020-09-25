import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeStorage } from '../helpers/auth';

import * as actions from '../actions/useraction';

function Signout({ toggleLogged }) {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        removeStorage('user');
        toggleLogged(false);
        setRedirect(true);
    }, [toggleLogged]);

    return (
        <>
            { redirect && <Redirect to='/' />}
        </>
    )
}

const mapStateToProps = (state, ownProps) => ({
    logged: state.logged
});

const mapDispatchToProps = (dispatch) => ({
    toggleLogged: b => dispatch(actions.toggleLogged(b))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signout);