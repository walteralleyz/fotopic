import { Router } from 'express';
import { Controller as Post } from '../controller/post';

const post = new Post();

export const routes = [
    Router().post('/new', post.create)
    // Router().get('/'),
    // Router().get('/:id'),
    // Router().delete('/:id'),
    // Router().put('/:id')
];