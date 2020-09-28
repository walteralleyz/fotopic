import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Holder from '../components/forms/signin';
import Modal from '../components/modular/modal';

import { routes, baseLink, links } from '../helpers/routes';
import { sendData } from '../helpers/fetch';
import { isEmail } from '../helpers/validator';
import { saveDataStorage } from '../helpers/auth';

import * as actions from '../actions/useraction';
import * as toast from '../actions/toastactions';

function Signin({ toggleLogged, toastStatus, toastText }) {
    const [userEmail, setUserEmail] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [code, setCode] = useState({
        a: 0,
        b: 0,
        c: 0,
        d: 0
    });

    const [modal, setModal] = useState({
        title: 'Insira seu código de confirmação',
        visible: false
    });

    const verifyCB = useCallback(() => {
        const { a, b, c, d } = code;

        sendData(
            baseLink + links.user.base + links.user.verify,
            JSON.stringify({ code: parseInt(`${a}${b}${c}${d}`), email: userEmail }),
            'POST'
        )
            .then(data => {
                if(!data.error) {
                    toggleLogged(true);
                    saveDataStorage('user', data);
                    setRedirect(true);
                } else {
                    toastStatus('danger');
                    toastText('Código Incorreto!');
                }
            });
    }, [code, toggleLogged, toastStatus, toastText, userEmail]);

    const emailCB = useCallback(() => {
        sendData(
            baseLink + links.user.base + links.user.signin,
            JSON.stringify({ email: userEmail }),
            'POST'
        )
            .then(data => {
                if(!data.error) {
                    saveDataStorage('user', data);
                    setModal({
                        ...modal,
                        visible: true
                    });
                } else {
                    toastStatus('danger');
                    toastText('Email não encontrado!');
                }
            });
    }, [modal, toastStatus, toastText, userEmail]);

    const verifySign = () => verifyCB();

    const handleSubmit = () => {
        if (isEmail(userEmail)) emailCB();
    };

    return (
        <>
            <Holder
                email={{value: userEmail, changer: setUserEmail}}
                handleSubmit={handleSubmit}
            />
            {modal.visible &&
                <Modal 
                    title={modal.title}
                    code={code}
                    setCode={setCode}
                    verifySign={verifySign} 
                />
            }

            {redirect && <Redirect to={routes.main} />}
        </>
    )
}

const mapStateToProps = (state, ownProps) => ({
    logged: state.logged,
    tStatus: state.toast.status,
    tText: state.toast.text
});

const mapDispatchToProps = (dispatch) => ({
    toggleLogged: b => dispatch(actions.toggleLogged(b)),
    toastStatus: status => dispatch(toast.toastStatus(status)),
    toastText: text => dispatch(toast.toastText(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);