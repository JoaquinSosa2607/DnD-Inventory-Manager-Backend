import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeOfWeapon } from "../helpers/enums";

@Entity()
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: TypeOfWeapon })
    type: TypeOfWeapon;

    @Column()
    damage: string;

}