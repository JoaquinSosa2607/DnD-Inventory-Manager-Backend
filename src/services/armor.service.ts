import {getEntityRepository} from "../config/repository/repository";
import {Armor} from "../entities/Armor";

const armorRepository = getEntityRepository(Armor);

export async function findAllArmors() {
    return await armorRepository.find();
}

export async function findArmorById(armorId: number) {
    return await armorRepository.findOne({
        where: {
            id: armorId
        }
    });
}