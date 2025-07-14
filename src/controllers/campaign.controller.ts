import { Request, Response } from "express";
import { Campaign } from "../entities/Campaign";
import { campaignRepository } from "../config/repository/repository";

export const getAllCampaigns = async (_req: Request, res: Response) => {
    try {
        const campaigns: Campaign[] = await campaignRepository.find();
        if(campaigns.length === 0) {
            res.status(404).send({ message: "No existen campañas registradas." });
            return;
        }
        res.status(200).json({ campaigns: campaigns });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
            return;
        }
    }
}