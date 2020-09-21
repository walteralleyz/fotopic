import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { FotoUser } from '../entities/user';
import { Post } from '../entities/post';
import { Friends } from '../entities/friends';

export function connect(path: string) {
    createConnection({
        type: 'postgres',
        database: 'fotobase',
        port: 5432,
        username: 'fotopic',
        password: 'mmfotomm',
        synchronize: true,
        logging: false,
        entities: [
            FotoUser,
            Post,
            Friends
        ]
    })
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));
}