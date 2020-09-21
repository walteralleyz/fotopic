import {
    Entity,
    PrimaryGeneratedColumn,
    Column, ManyToOne
} from 'typeorm';

import { FotoUser } from '../entities/user';

@Entity()
export class Friends {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    friendId: number;

    @Column()
    status: number;

    @ManyToOne(type => FotoUser, user => user.friends)
    user: FotoUser;
}