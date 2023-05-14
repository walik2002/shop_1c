import {Router} from "express";
import goodRouter from "./goodRouter.js";
import userRouter from "./userRouter.js";

const router = new Router();

router.use('/user',userRouter);
router.use('/goods',goodRouter);

export default router;