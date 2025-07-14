import {armorRepository} from "../config/repository/repository";

export async function findArmorById(armorId: number) {
    return await armorRepository.findOne({
        where: {
            id: armorId
        }
    });
}