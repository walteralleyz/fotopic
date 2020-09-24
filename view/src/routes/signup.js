import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from '../components/form';
import Input from '../components/input';
import Button from '../components/button';

import { routes } from '../helpers/routes';

export default function Signup() {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    return (
        <Form title='Vamos Cadastrar!'>
            <Input
                type='text'
                value={userName}
                changer={e => setUserName(e.currentTarget.value)}
                text='Ex.: Roberto da Silva'
                name='Name'
            />

            <Input
                type='email'
                value={userEmail}
                changer={e => setUserEmail(e.currentTarget.value)}
                text='Ex.: roberto@gmail.com'
                name='Email'
            />

            <Link to={routes.signin} className='anchor'>
                Já tenho uma conta. Me tire daqui!
            </Link>

            <Button
                type='submit'
                color='purple'
            />
        </Form>
    )
}