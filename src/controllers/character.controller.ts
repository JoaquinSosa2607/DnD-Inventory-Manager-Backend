import { Request, Response } from "express";
import { CreateCharacterInterface } from "../helpers/interfaces/character.interface";
import { createCharacterSchema } from "../helpers/validators/character.schema";
import { Character } from "../entities/Character";
import { findCharacterById, findUserCharacters, saveCharacter } from "../services/character.service";
import { characterRepository } from "../config/repository/repository";
import { User } from "../entities/User";
import { findUserById } from "../services/user.service";
import { IPayload } from "../middlewares";
import { extractPayload } from "../helpers/token/extractPayload";
import { Classes, Species } from "../helpers/enums";

export const createCharacter = async (req: Request, res: Response) => {
    try {
        createCharacterSchema.validate(req.body);
        const { name, species, character_class, level, campaign }: CreateCharacterInterface =
            req.body;

        const payload: IPayload = extractPayload(req);

        const userId: number = parseInt(payload.id);
        const user: User | null = await findUserById(userId);
        if (!user) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }

        const character: Character = await saveCharacter(
            name,
            species,
            character_class,
            level,
            user,
            campaign
        );
        res.status(201).send({
            message: `Personaje creado con éxito, bienvenido ${character.name}!`,
        });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
};

export const getAllCharacters = async (_req: Request, res: Response) => {
    try {
        const characters: Character[] = await characterRepository.find();
        if (characters.length === 0) {
            res.status(404).send({ message: "No hay personajes registrados." });
            return;
        }

        res.status(200).json({ characters: characters });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
};

export const getCharacterById = async (req: Request, res: Response) => {
    try {
        const characterId = parseInt(req.params.characterId);

        const character = await findCharacterById(characterId);
        if (!character) {
            res.status(404).send({ message: "Personaje no encontrado." });
            return;
        }

        res.status(200).json({ character: character });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
};

export const getUserCharacters = async (req: Request, res: Response) => {
    try {
        const payload: IPayload | null = extractPayload(req);
        if (!payload) {
            res.status(401).send({ message: "Error. Token null" });
            return;
        }
        const userId: number = parseInt(payload.id);
        const user: User | null = await findUserById(userId);
        if (!user) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }

        const userCharacters: Character[] = await findUserCharacters(user.id);
        if(userCharacters.length === 0) {
            res.status(404).send({ message: "No tienes personajes registrados." });
            return;
        }

        res.status(200).json({ characters: userCharacters });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
}

export const getEnums = (_req: Request, res: Response) => {
    try {
        const speciesArray: string[] = Object.values(Species);
        const classesArray: string[] = Object.values(Classes);

        res.status(200).json({ species: speciesArray, classes: classesArray });
        return;
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los valores de los enums" });
        return;
    }
};
