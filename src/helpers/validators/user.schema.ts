import Joi from "joi";
import { stringMessages } from "./validations.config";

export const createUserSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required().messages(stringMessages),
    lastname: Joi.string().min(3).max(30).required().messages(stringMessages),
    password: Joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages(stringMessages),
    email: Joi.string().email().required().messages(stringMessages)
})