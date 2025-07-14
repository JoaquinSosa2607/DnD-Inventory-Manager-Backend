import { Router } from "express";
import { addArmorToInventory, getAllArmors, getCharacterArmors } from "../controllers/armor.controller";

const router = Router();

// POST
router.post("/add-armor", addArmorToInventory);

// GET
router.get("/all-armors", getAllArmors);
router.get("/character-armors/:characterId", getCharacterArmors);

export default router;