import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendData }  from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import * as toast from '../actions/toastactions';

import Holder from '../components/forms/signup';

function Signup({ toastStatus, toastText }) {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = () => {
        if(userEmail && userName) {
            const userData = {
                name: userName,
                email: userEmail
            };

            sendData(
                baseLink + links.user.base + links.user.signup,
                JSON.stringify(userData),
                'POST'
            )
            .then(result => {
                if(!result.error) {
                    setRedirect(true);
                    toastStatus('success');
                    toastText('Cadastrado. Faça o Login!');
                } else {
                    toastStatus('danger');
                    toastText('Dados Incorretos ou conta já existe!');
                }
            })

        }
    };

    return (
        <>
            <Holder
                name={{value: userName, changer: setUserName}}
                email={{value: userEmail, changer: setUserEmail}}
                handler={handleSubmit}
            />
            {redirect && <Redirect to='/signin' />}
        </>
    )
}

const mapStateToProps = state => ({
    tStatus: state.toast.status,
    tText: state.toast.text
});

const mapDispatchToProps = dispatch => ({
    toastStatus: status => dispatch(toast.toastStatus(status)),
    toastText: text => dispatch(toast.toastText(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);