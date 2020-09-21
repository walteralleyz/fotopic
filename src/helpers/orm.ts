import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { User } from '../entities/user';
import { Post } from '../entities/post';
import { Friends } from '../entities/friends';

export async function connect(path: string) {
    await createConnection({
        type: 'sqlite',
        database: path,
        synchronize: true,
        logging: false,
        entities: [
            User,
            Post,
            Friends
        ]
    });
}