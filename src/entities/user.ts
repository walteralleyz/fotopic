import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany, Unique
} from 'typeorm';

import { Friends } from '../entities/friends';
import { Post } from '../entities/post';

@Entity()
@Unique(['email'])
export class FotoUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        type: 'varchar'
    })
    name: string;

    @Column({
        length: 255,
        type: 'varchar'
    })
    description?: string;

    @Column()
    email: string;

    @Column({
        type: 'bytea'
    })
    image?: string;

    @Column({ type: 'bigint' })
    createdAt: number;

    @Column({ type: 'bigint' })
    updatedAt: number;

    @OneToMany(type => Friends, friends => friends.user)
    friends: Friends[];

    @OneToMany(type => Post, post => post.user)
    posts: Post[];
}