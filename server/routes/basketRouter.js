import {Router} from "express";
import basketController from "../controllers/basketController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/add',basketController.addToBasket);
router.post('/delete',basketController.deleteFromBasket);
router.post('/',basketController.getBasketGoods);
export default router;