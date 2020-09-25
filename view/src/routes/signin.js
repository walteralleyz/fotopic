import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Form from '../components/form';
import Input from '../components/input';
import Button from '../components/button';
import Modal from '../components/modal';

import { routes, baseLink, links } from '../helpers/routes';
import { sendData } from '../helpers/fetch';
import { isEmail } from '../helpers/validator';
import { saveDataStorage } from '../helpers/auth';

export default function Signin() {
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

    const verifySign = () => {
        const { a, b, c, d } = code;

        sendData(
            baseLink + links.user.base + links.user.verify,
            JSON.stringify({ code: parseInt(`${a}${b}${c}${d}`), email: userEmail }),
            'POST'
        )
            .then(data => {
                saveDataStorage('user', {email: userEmail, token: data.token});
                setRedirect(true);
            });
    };

    const handleSubmit = () => {
        if (isEmail(userEmail)) {
            sendData(
                baseLink + links.user.base + links.user.signin,
                JSON.stringify({ email: userEmail }),
                'POST'
            )
                .then(data => saveDataStorage('user', data));

            setModal({
                ...modal,
                visible: true
            });
        }
    };

    return (
        <Form title='Bem vindo de volta!'>
            <Input
                type='email'
                value={userEmail}
                changer={e => setUserEmail(e.currentTarget.value)}
                text='Ex.: roberto@gmail.com'
                name='Email'
            />

            <Link to={routes.signup} className='anchor'>
                Ainda não tem uma conta? Crie Agora!
            </Link>

            <Button
                type='submit'
                color='purple'
                handler={handleSubmit}
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
        </Form>
    )
}