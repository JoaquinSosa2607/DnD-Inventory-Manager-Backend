import jwt from "jsonwebtoken";
import { OPTION_TOKEN_KEY, SECRET_TOKEN_KEY } from "../../env";
import { User } from "../../entities/User";
import CryptoJS from "crypto-js";
import { getEntityRepository } from "../../config/repository/repository";

export const tokenSignUser = async (user: User) => {
    const optionTokenKey: string | undefined = OPTION_TOKEN_KEY?.toString();
    if (!optionTokenKey) {
        throw new Error("Error. OptionTokenKey null");
    }
    const refreshToken: string = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        SECRET_TOKEN_KEY || optionTokenKey,
        {
            algorithm: "HS256",
            expiresIn: "7d",
        }
    );
    const authToken: string = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        SECRET_TOKEN_KEY || optionTokenKey,
        {
            algorithm: "HS256",
            expiresIn: "30m",
        }
    );
    // Encrypt the token
    const refreshTokenWordArray: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(refreshToken);
    const encryptToken: string = CryptoJS.AES.encrypt(refreshTokenWordArray, "8po4si2hqpcql6k18hqs").toString();
    user.refreshToken = encryptToken;
    const userRepository = getEntityRepository(User);
    await userRepository.save(user);
    return {
        authToken,
        refreshToken: encryptToken,
    };
}