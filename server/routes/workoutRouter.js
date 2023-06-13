import {Router} from "express";
import workoutController from '../controllers/workoutController.js';
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.get('/', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.put('/:id',checkRoleMiddleware("ADMIN"), workoutController.updateWorkout);
router.delete('/:id',checkRoleMiddleware("ADMIN"), workoutController.deleteWorkout);
router.post('/extend', checkRoleMiddleware("ADMIN"),workoutController.getAllWorkoutsWithBindData);

export default router;