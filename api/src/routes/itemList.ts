import { Router } from 'express';
import { Controller as ItemList } from '../controller/itemList';
import { checkCreate, checkUpdate, regularValidation } from '../helpers/itemValidator';
import { verifyJWT } from '../controller/auth';

const item = new ItemList();

export const routes = [
    Router().post('/new', verifyJWT, checkCreate, regularValidation, item.create),
    Router().get('/:id', verifyJWT, item.read),
    Router().delete('/:id', verifyJWT, item.delete),
    Router().put('/:id', verifyJWT, checkUpdate, regularValidation, item.update)
];