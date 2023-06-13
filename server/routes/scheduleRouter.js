import express from 'express';
import scheduleController from '../controllers/scheduleController.js';
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.post('/',checkRoleMiddleware("ADMIN"), scheduleController.createSchedule);
router.put('/:id',checkRoleMiddleware("ADMIN"), scheduleController.updateSchedule);
router.delete('/:id',checkRoleMiddleware("ADMIN"), scheduleController.deleteSchedule);
router.get('/:scheduleId/available-spots', scheduleController.getAvailableSpots);
router.post('/range', scheduleController.getSchedulesByDateRange);
router.post('/actual', scheduleController.getUpcomingSchedules);

export default router;
