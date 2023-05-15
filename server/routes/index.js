import {Router} from "express";
import goodRouter from "./goodRouter.js";
import userRouter from "./userRouter.js";
import basketRouter from "./basketRouter.js";

const router = new Router();

router.use('/user',userRouter);
router.use('/goods',goodRouter);
router.use('/basket',basketRouter)
export default router;