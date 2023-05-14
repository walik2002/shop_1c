import {Router} from "express";
import goodController from "../controllers/goodController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('/',checkRoleMiddleware("ADMIN"),goodController.create);
router.get('/',goodController.getAll);
router.get('/:id',goodController.getOne);

export default router;