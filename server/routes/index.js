import {Router} from "express";
import userRouter from "./userRouter.js";
import workoutRouter from "./workoutRouter.js";
import trainerRouter from "./trainerRouter.js";
import scheduleRouter from "./scheduleRouter.js";
import bookingRouter from "./bookingRouter.js";


const router = new Router();

router.use('/user',userRouter);
router.use('/workout',workoutRouter);
router.use('/trainer',trainerRouter);
router.use('/schedule', scheduleRouter);
router.use('/booking',bookingRouter)
export default router;