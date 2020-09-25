import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../helpers/routes';

import Form from '../modular/form';
import Input from '../modular/input';
import Button from '../modular/button';

const Holder = ({ email, handleSubmit }) => (
    <Form title='Bem vindo de volta!'>
        <Input
            type='email'
            value={email.value}
            changer={e => email.changer(e.currentTarget.value)}
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
    </Form>
);

export default Holder;