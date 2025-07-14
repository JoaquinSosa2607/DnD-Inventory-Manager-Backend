import {getEntityRepository} from "../config/repository/repository";
import {Campaign} from "../entities/Campaign";
import {Character} from "../entities/Character";
import {User} from "../entities/User";
import {Classes, Species} from "../helpers/enums";

const characterRepository = getEntityRepository(Character)

export async function saveCharacter(name: string, species: Species, character_class: Classes, level: number, user: User, campaign: Campaign) {
    const newCharacter: Character = new Character()

    newCharacter.name = name;
    newCharacter.species = species;
    newCharacter.character_class = character_class;
    newCharacter.level = level;
    newCharacter.user = user;
    newCharacter.campaign = campaign;
    
    await characterRepository.save(newCharacter);
    return newCharacter;
}

export async function findCharacterById(characterId: number) {
    return await characterRepository.findOne({
        where: {
            id: characterId
        },
        relations: {
            armors: true
        }
    });
}

export async function findUserCharacters(userId: number) {
    return await characterRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            campaign: true
        }
    });
}