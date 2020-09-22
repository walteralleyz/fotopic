import { Router } from 'express';
import { Controller as Post } from '../controller/post';

const post = new Post();

export const routes = [
    Router().post('/new', post.create),
    Router().get('/:id', post.read),
    Router().delete('/:id', post.delete),
    Router().put('/:id', post.update)
];