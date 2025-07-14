import { Router } from "express";
import { isUserRole } from "../middlewares/validateUser";
import { createCharacter, getAllCharacters, getCharacterById, getUserCharacters } from "../controllers/character.controller";

const router = Router();

// POST
router.post("/create-character", isUserRole, createCharacter);

//GET
router.get("/all-characters", getAllCharacters);
router.get("/user-characters", isUserRole, getUserCharacters);
router.get("/:characterId", getCharacterById);

export default router;
