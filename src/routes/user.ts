import { Router } from 'express';

import { Controller as User } from '../controller/user';

const user: User = new User();

export const routes = [
    Router().get('/:id', user.read),
    Router().post('/signup', user.create),
    Router().post('/signin', user.signin),
    Router().delete('/:id', user.delete),
    Router().put('/:id', user.update),
    Router().put('/add/:id', user.add)
];