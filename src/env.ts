import { config } from "dotenv"

config();

export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_NAME: string | undefined = process.env.DB_NAME;
export const DB_USER: string | undefined = process.env.DB_USER;
export const MYSQL_PASSW: string | undefined = process.env.MYSQL_PASSW;
export const DB_PORT: number = Number(process.env.DB_PORT);
export const PORT: number = Number(process.env.PORT);
export const OPTION_TOKEN_KEY: string | undefined = process.env.OPTION_TOKEN_KEY;
export const SECRET_TOKEN_KEY: string | undefined = process.env.SECRET_TOKEN_KEY;