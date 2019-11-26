import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { IsNotEmpty } from "class-validator";
import {User} from "./User";

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: "blank" })
    status: string;

    @ManyToOne(type => User, user => user.status)
    user: User;

}