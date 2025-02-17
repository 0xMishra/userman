import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";
import { validateUser } from "../utils/validators";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, validateUser, createUser);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, validateUser, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default router;
