import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
router.get("/",checkRoleMiddleware("ADMIN"), userController.getAllUsers);
router.get("/:id",checkRoleMiddleware("ADMIN"), userController.getUserById);
router.post("/",checkRoleMiddleware("ADMIN"), userController.createUser);
router.put("/:id",checkRoleMiddleware("ADMIN"), userController.updateUser);
router.delete("/:id",checkRoleMiddleware("ADMIN"), userController.deleteUser);

export default router;
