import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SuperUser } from '../entities/user';
import { ItemList } from '../entities/itemList';

import dotenv from 'dotenv';

dotenv.config();

export function connect() {
    createConnection({
        type: 'postgres',
        database: process.env.DATABASE_BASE,
        port:    +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PSWD,
        synchronize: true,
        logging: false,
        entities: [
            SuperUser,
            ItemList
        ]
    })
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));
}