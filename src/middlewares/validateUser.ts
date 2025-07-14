import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { OPTION_TOKEN_KEY, SECRET_TOKEN_KEY } from "../env";
import { IPayload } from "./index";

export const isUserRole = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-header");
    const optionTokenKey: string | undefined = OPTION_TOKEN_KEY?.toString();
    if (!optionTokenKey) {
        res.status(404).send({ message: "optionTokenKey null" });
        return;
    }
    try {
        if (!token) {
            res.status(401).json("No hay token en la petición. Acceso denegado");
            return;
        }
        const payload = jwt.verify(token, SECRET_TOKEN_KEY || optionTokenKey) as unknown as IPayload;
        req.userId = payload.id;
        req.userRole = payload.role;
        if (req.userRole == "USER_ROLE") {
            next();
        } else {
            res.status(401).send({ message: "No posee un rol autorizado. Acceso denegado" });
            return;
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(500).send({ message: "Token de usuario expirado" });
            return;
        }
        res.status(500).send({ message: "Error al verificar el token" });
        return;
    }
};
