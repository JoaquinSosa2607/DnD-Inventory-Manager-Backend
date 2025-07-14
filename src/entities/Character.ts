import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Armor } from "./Armor";
import { Campaign } from "./Campaign";
import { User } from "./User";
import { Classes, Species } from "../helpers/enums";

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Species })
    species: Species;

    @Column({ type: 'enum', enum: Classes })
    character_class: Classes;

    @Column()
    level: number;

    @ManyToMany(() => Armor, (armor) => armor.characters)
    @JoinTable({ name: "armor_player" })
    armors: Armor[];

    @ManyToOne(() => Campaign, (campaign) => campaign.character)
    @JoinColumn({ name: "campaign_id"})
    campaign: Campaign;

    @ManyToOne(() => User, (user) => user.character)
    @JoinColumn({ name: "user_id"})
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
