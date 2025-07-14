import Joi from "joi";
import { numberMessages, stringMessages } from "./validations.config";
import { Classes, Species } from "../enums";

export const createCharacterSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages(stringMessages),
    species: Joi.string().valid(...Object.values(Species)).required().messages(stringMessages),
    player_class: Joi.string().valid(...Object.values(Classes)).required().messages(stringMessages), // Usando valid en lugar de allow
    level: Joi.number().min(1).max(20).required().messages(numberMessages)
});
