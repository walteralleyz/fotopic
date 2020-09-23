import { Router } from 'express';

import { Controller as User } from '../controller/user';
import { checkCreate, checkLogin, checkUpdate, regularHandler } from '../helpers/userValidator';
import { verifyJWT } from '../controller/auth';

const user: User = new User();

export const routes = [
    Router().post('/signup', checkCreate, regularHandler, user.create),
    Router().post('/signin', checkLogin, regularHandler, user.signin),
    Router().post('/verifySign', user.verifySignin),

    Router().delete('/:id', verifyJWT, user.delete),
    Router().put('/:id', verifyJWT, checkUpdate, regularHandler, user.update),
    Router().get('/:id', verifyJWT, user.read)
];