import {Router} from "express";

import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import orderController from "../controllers/orderController.js";

const router = new Router();

router.post('/',orderController.createOrder);
export default router;