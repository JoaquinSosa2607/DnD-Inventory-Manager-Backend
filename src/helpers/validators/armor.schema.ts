import Joi from "joi";
import { numberMessages } from "./validations.config";

export const addArmorSchema = Joi.object({
    armorId: Joi.number().min(1).required().messages(numberMessages),
    characterId: Joi.number().min(1).required().messages(numberMessages)
});
