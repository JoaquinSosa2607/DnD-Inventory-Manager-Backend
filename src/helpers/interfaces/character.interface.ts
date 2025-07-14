import { Campaign } from "../../entities/Campaign";
import { Classes, Species } from "../enums";


export interface CreateCharacterInterface {
    name: string;
    species: Species;
    character_class: Classes;
    level: number;
    campaign: Campaign;
}