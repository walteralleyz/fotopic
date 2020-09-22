import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from 'typeorm';

import { SuperUser } from './user';

@Entity()
export class ItemList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        type: 'varchar'
    })
    store: string;

    @Column({ type: 'json' })
    items: string;

    @Column({ type: 'bigint' })
    createdAt: number;

    @Column({ type: 'bigint' })
    updatedAt: number;

    @ManyToOne(type => SuperUser, user => user.posts)
    user: SuperUser;
}