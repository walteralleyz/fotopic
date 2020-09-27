import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SuperUser } from '../entities/user';
import { ItemList } from '../entities/itemList';

import dotenv from 'dotenv';

dotenv.config();

export function connect() {
    createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
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
