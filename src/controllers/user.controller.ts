import { Request, Response } from "express";
import { UserInterface } from "../helpers/interfaces/user.interface";
import { User } from "../entities/User";
import { signIn, signUp } from "../services/user.service";
import { createUserSchema } from "../helpers/validators/user.schema";
import { validatePassword } from "../helpers/handlePassword";
import { ITokenAuthAndRefresh } from "../helpers/interfaces/token.interface";
import { tokenSignUser } from "../helpers/token/tokenSignUser";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password}: UserInterface = req.body;
        await createUserSchema.validateAsync(req.body);
        const user: User = await signUp(firstname, lastname, email, password);
        res.status(201).send({ message: `Usuario creado correctamente. Bienvendio ${user.firstname}!` });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

export const signInUser = async (req: Request, res: Response) => {
    try {
        const { password, email }: UserInterface = req.body;
        const user: User = await signIn(email);
        const userPassword: string = user.password;
        const isPasswordValid: boolean = await validatePassword(password, userPassword);
        if (!isPasswordValid) {
            res.status(401).send({ message: "Contraseña incorrecta" });
            return;
        }
        const token: ITokenAuthAndRefresh = await tokenSignUser(user);
        res.status(200).json({ tokens: { authToken: token.authToken, refreshToken: token.refreshToken } });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}