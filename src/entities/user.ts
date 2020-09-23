import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany, Unique
} from 'typeorm';

import { ItemList } from './itemList';

@Entity()
@Unique(['email'])
export class SuperUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        type: 'varchar'
    })
    name: string;

    @Column()
    email: string;

    @Column({
        type: 'bytea'
    })
    image?: string;

    @Column()
    code?: number;

    @Column({ type: 'bigint' })
    createdAt: number;

    @Column({ type: 'bigint' })
    updatedAt: number;

    @OneToMany(type => ItemList, items => items.user)
    posts: ItemList[];
}