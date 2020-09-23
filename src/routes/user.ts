import { Router } from 'express';

import { Controller as User } from '../controller/user';
import { checkCreate, checkLogin, regularHandler } from '../helpers/userValidator';

const user: User = new User();

export const routes = [
    Router().get('/:id', user.read),
    Router().post('/signup', checkCreate, regularHandler, user.create),
    Router().post('/signin', checkLogin, regularHandler, user.signin),
    Router().delete('/:id', user.delete),
    Router().put('/:id', user.update),
    Router().post('/verifySign', user.verifySignin)
];