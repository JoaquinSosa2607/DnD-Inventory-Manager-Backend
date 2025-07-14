import {userRepository} from "../config/repository/repository";
import {User} from "../entities/User";
import {hashPassword} from "../helpers/handlePassword";

export async function signUp( firstname: string, lastname: string, email: string, password: string) {
    const user: User = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = hashPassword(password);
    user.email = email;
    
    await userRepository.save(user);
    return user;
}

export async function signIn(email: string) {
    const user: User | null = await userRepository.findOne({
        where: {
            email: email,
        }
    });
    if (!user) {
        throw new Error("El usuario es incorrecto. Intente nuevamente");
    }
    return user;
}

export async function findUserById(userId: number) {
    return await userRepository.findOne({
        where: {
            id: userId
        }
    });
}