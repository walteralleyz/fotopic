import { Router } from 'express';
import { Controller as ItemList } from '../controller/itemList';

const item = new ItemList();

export const routes = [
    Router().post('/new', item.create),
    Router().get('/:id', item.read),
    Router().delete('/:id', item.delete),
    Router().put('/:id', item.update)
];