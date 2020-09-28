import React from 'react';

import Form from '../modular/form';
import Input from '../modular/input';
import Button from '../modular/button';

export const Holder = ({ userData, changer, send }) => (
    <Form title='Fale comigo!'>
        <Input
            type='text'
            name='Nome'
            text='Escreva seu nome completo'
            value={userData.name}
            changer={e => changer.setName(e.currentTarget.value)}
        />

        <Input
            type='email'
            name='Email'
            text='Ex.: roberto@gmail.com'
            value={userData.email}
            changer={e => changer.setEmail(e.currentTarget.value)}
        />

        <textarea
            className='form__textarea'
            onChange={e => changer.setMsg(e.currentTarget.value)}
        >{userData.msg}</textarea>

        <Button
            type='submit'
            text='Enviar'
            color='red'
            size='large'
            handler={send}
        />
    </Form>
);