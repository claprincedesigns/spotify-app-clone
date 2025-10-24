import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", protectRoute, getAllUsers);
// todo get Messages

export default router;
