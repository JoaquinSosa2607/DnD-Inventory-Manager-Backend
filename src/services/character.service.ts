import {getEntityRepository} from "../config/repository/repository";
import {Campaign} from "../entities/Campaign";
import {Character} from "../entities/Character";
import {User} from "../entities/User";
import {Classes, Species} from "../helpers/enums";
import {findArmorById} from "./armor.service";
import {Armor} from "../entities/Armor";

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

export async function findALlCharacters() {
    return await characterRepository.find({});
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

export async function addArmorToCharacterInventory(armorId: number, characterId: number): Promise<void> {
    const armor: Armor | null = await findArmorById(armorId);
    if (!armor) {
        throw new Error("Armadura no registrada.");
    }

    const character: Character | null = await findCharacterById(characterId);
    if (!character) {
        throw new Error("Personaje no registrado.");
    }

    const alreadyHasArmor = character.armors.some(
        (existingArmor) => existingArmor.id === armor.id
    );

    if (alreadyHasArmor) {
        throw new Error("El personaje ya tiene asignada esta armadura.");
    }

    character.armors.push(armor);
    await characterRepository.save(character);
}