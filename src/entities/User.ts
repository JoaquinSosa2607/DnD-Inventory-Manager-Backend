import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: "USER_ROLE" })
    role: string;

    @Column({ type: 'mediumtext', nullable: true })
    refreshToken: string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    @OneToMany(() => Character, (character) => character.user)
    character: Character[];
}