import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from '../components/form';
import Input from '../components/input';
import Button from '../components/button';

export default function Signin() {
    const [userEmail, setUserEmail] = useState('');

    return (
        <Form title='Bem vindo de volta!'>
            <Input
                type='email'
                value={userEmail}
                changer={e => setUserEmail(e.currentTarget.value)}
                text='Ex.: roberto@gmail.com'
                name='Email'
            />

            <Link to='/signup' className='anchor'>
                Ainda não tem uma conta? Crie Agora!
            </Link>

            <Button
                type='submit'
                color='purple'
            />
        </Form>
    )
}