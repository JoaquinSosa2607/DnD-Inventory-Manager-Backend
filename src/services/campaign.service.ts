import {getEntityRepository} from "../config/repository/repository";
import {Campaign} from "../entities/Campaign";

const campaignRepository = getEntityRepository(Campaign);

export async function findAllCampaigns() {
    return await campaignRepository.find();
}