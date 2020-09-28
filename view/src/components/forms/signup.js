import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../helpers/routes';

import Form from '../modular/form';
import Input from '../modular/input';
import Button from '../modular/button';

const Holder = ({ name, email, handler }) => (
    <Form title='Vamos Cadastrar!'>
        <Input
            type='text'
            value={name.value}
            changer={e => name.changer(e.currentTarget.value)}
            text='Ex.: Roberto da Silva'
            name='Name'
        />

        <Input
            type='email'
            value={email.value}
            changer={e => email.changer(e.currentTarget.value)}
            text='Ex.: roberto@gmail.com'
            name='Email'
        />

        <Link to={routes.signin} className='anchor'>
            Já tenho uma conta. Me tire daqui!
        </Link>

        <Button
            type='submit'
            color='purple'
            handler={handler}
        />
    </Form>
);

export default Holder;