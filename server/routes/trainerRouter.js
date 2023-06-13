import express from 'express';
import trainerController from '../controllers/trainerController.js';
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.get('/', trainerController.getAllTrainers);
router.get('/:id', trainerController.getTrainerById);
router.post('/',checkRoleMiddleware("ADMIN"), trainerController.createTrainer);
router.put('/:id',checkRoleMiddleware("ADMIN"), trainerController.updateTrainer);
router.delete('/:id',checkRoleMiddleware("ADMIN"), trainerController.deleteTrainer);
router.post('/extend/:id',checkRoleMiddleware("ADMIN"),trainerController.getTrainerByIdExtend);

export default router;
