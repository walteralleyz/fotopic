import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from 'typeorm';

import { User } from '../entities/user';

@Entity()
export class Friends {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    friendId: number;

    @Column()
    status: number;

    @ManyToOne(type => User, user => user.friends)
    user: User;
}