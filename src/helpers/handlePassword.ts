import bcrypt from "bcrypt";

export function hashPassword(password: string) {
    const saltround: number = 10;
    return bcrypt.hashSync(password, saltround);
}

export async function validatePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
}