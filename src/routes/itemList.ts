import { Router } from 'express';
import { Controller as ItemList } from '../controller/itemList';
import { checkCreate, checkUpdate, regularValidation } from '../helpers/itemValidator';

const item = new ItemList();

export const routes = [
    Router().post('/new', checkCreate, regularValidation, item.create),
    Router().get('/:id', item.read),
    Router().delete('/:id', item.delete),
    Router().put('/:id', checkUpdate, regularValidation, item.update)
];