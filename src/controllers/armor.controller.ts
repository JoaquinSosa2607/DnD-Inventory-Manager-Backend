import { Request, Response } from "express";
import { AddArmorInterface } from "../helpers/interfaces/armor.interface";
import { addArmorSchema } from "../helpers/validators/armor.schema";
import { Armor } from "../entities/Armor";
import { Character } from "../entities/Character";
import {addArmorToCharacterInventory, findCharacterById} from "../services/character.service";
import {findAllArmors} from "../services/armor.service";

export const addArmorToInventory = async (req: Request, res: Response) => {
    try {
        const { armorId, characterId }: AddArmorInterface = req.body;

        addArmorSchema.validate(req.body);

        await addArmorToCharacterInventory(armorId, characterId);

        res.status(200).send({ message: "Armadura agregada correctamente." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: `Error interno del servidor. ${error.message}` });
            return
        }
    }
};

export const getAllArmors = async (_req: Request, res: Response) => {
    try {
        const armors: Armor[] = await findAllArmors();
        if(armors.length === 0) {
            res.status(404).send({ message: "No hay armaduras registradas." });
            return;
        }
        res.status(200).json({ Armors: armors });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
}

export const getCharacterArmors = async (req: Request, res: Response) => {
    try {
        const characterId: number = parseInt(req.params.characterId);

        const character: Character | null = await findCharacterById(characterId);
        if(!character) {
            res.status(404).send({ message: "Personaje no encontrado." });
            return;
        }

        const characterArmors: Armor[] = character.armors;
        if(characterArmors.length === 0) {
            res.status(404).send({ message: "Tu personaje no cuenta con armaduras o escudos en su intentario." });
            return;
        }
        
        res.status(200).json({ armors: characterArmors });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
}