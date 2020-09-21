import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from 'typeorm';

import { FotoUser } from '../entities/user';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500,
        type: 'varchar'
    })
    text: string;

    @Column({
        type: 'bytea'
    })
    image?: string;

    @ManyToOne(type => FotoUser, user => user.posts)
    user: FotoUser;
}