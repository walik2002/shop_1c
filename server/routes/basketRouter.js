import {Router} from "express";
import basketController from "../controllers/basketController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/add',authMiddleware,basketController.addToBasket);
router.post('/delete',authMiddleware,basketController.deleteFromBasket);
router.post('/',authMiddleware,basketController.getBasketGoods);
export default router;