import { Router } from 'express';

export const routes = [
    Router().post('/new'),
    Router().get('/'),
    Router().get('/:id'),
    Router().delete('/:id'),
    Router().put('/:id')
];