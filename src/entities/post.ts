import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from 'typeorm';

import { User } from '../entities/user';

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
        type: 'blob'
    })
    image?: string;

    @ManyToOne(type => User, user => user.posts)
    user: User;
}