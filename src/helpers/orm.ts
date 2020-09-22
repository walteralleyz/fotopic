import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SuperUser } from '../entities/user';
import { ItemList } from '../entities/itemList';

export function connect() {
    createConnection({
        type: 'postgres',
        database: 'superlista',
        port: 5432,
        username: 'fotopic',
        password: 'mmfotomm',
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