import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Character} from "./Character";
import {Campaign} from "./Campaign";
import {TypeOfArmor} from "../helpers/enums";

@Entity()
export class Armor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'enum', enum: TypeOfArmor})
    type: TypeOfArmor;

    @Column()
    AC: string;

    @Column()
    strength: string;

    @Column()
    stealth: string;

    @ManyToMany(() => Character, (character) => character.armors)
    characters: Character[];

    @ManyToOne(() => Campaign, (campaign) => campaign.armor)
    @JoinColumn({name: "campaign_id"})
    campaign: Campaign;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
