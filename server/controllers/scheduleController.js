import {Booking, Schedule, Trainer, Workout} from '../models/models.js';
import ApiError from '../error/apiError.js';
import {Op, where} from "sequelize";

async function addCountOfBookingsToResponse(schedules){
    const schedulesWithBookingsCount = await Promise.all(
        schedules.map(async (schedule) => {
            const bookingsCount = await Booking.count({
                where: { scheduleId: schedule.id }
            });
            return {
                ...schedule.toJSON(),
                bookingsCount
            };
        })
    );
    return schedulesWithBookingsCount;
}
class ScheduleController {

    async getAllSchedules(req, res, next) {
        try {
            const schedules = await Schedule.findAll({
                include: [Trainer, Workout],
                order: [
                    ['date', 'ASC'], // Сортировка по возрастанию даты
                    ['startTime', 'ASC'] // Сортировка по возрастанию времени начала
                ]
            });
            const data = await addCountOfBookingsToResponse(schedules);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getUpcomingSchedules(req, res, next) {
        try {
            const schedules = await Schedule.findAll({
                where: {
                    date: {
                        [Op.gte]: new Date() // Фильтр: дата не раньше сегодняшнего дня
                    }
                },
                include: [Trainer, Workout],
                order: [
                    ['date', 'ASC'], // Сортировка по возрастанию даты
                    ['startTime', 'ASC'] // Сортировка по возрастанию времени начала
                ]
            });
            const data = await addCountOfBookingsToResponse(schedules);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSchedulesByDateRange(req, res, next) {
        const { startDate, endDate } = req.body;

        try {
            const schedules = await Schedule.findAll({
                where: {
                    date: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                include: [Trainer, Workout],
            });

            res.json(schedules);
        } catch (error) {
            next(error);
        }
    }

    async getScheduleById(req, res, next) {
        const { id } = req.params;

        try {
            const schedule = await Schedule.findByPk(id, {
                include: [Trainer, Workout],
            });
            if (!schedule) {
                throw ApiError.notFound('Schedule not found');
            }
            res.json(schedule);
        } catch (error) {
            next(error);
        }
    }

    async createSchedule(req, res, next) {
        const { date, startTime, workoutId, trainerId,maxParticipants } = req.body;

        try {
            const schedule = await Schedule.create({ date, startTime, workoutId, trainerId,maxParticipants });

            // Fetch associated trainer and workout
            const trainer = await Trainer.findByPk(trainerId);
            const workout = await Workout.findByPk(workoutId);

            schedule.dataValues.trainer = trainer;
            schedule.dataValues.workout = workout;

            res.status(201).json(schedule);
        } catch (error) {
            next(error);
        }
    }

    async updateSchedule(req, res, next) {
        const { id } = req.params;
        const { date, startTime, workoutId, trainerId,maxParticipants } = req.body;

        try {
            const schedule = await Schedule.findByPk(id);
            if (!schedule) {
                throw ApiError.notFound('Schedule not found');
            }

            await schedule.update({ date, startTime, workoutId, trainerId,maxParticipants });

            // Fetch associated trainer and workout
            const trainer = await Trainer.findByPk(trainerId);
            const workout = await Workout.findByPk(workoutId);

            schedule.dataValues.trainer = trainer;
            schedule.dataValues.workout = workout;

            res.json(schedule);
        } catch (error) {
            next(error);
        }
    }

    async deleteSchedule(req, res, next) {
        const { id } = req.params;

        try {
            const schedule = await Schedule.findByPk(id, { include: Booking });
            if (!schedule) {
                throw ApiError.notFound('Schedule not found');
            }

            // Удаление связанных бронирований
            await Booking.destroy({ where: { ScheduleId: id } });

            // Удаление расписания
            await schedule.destroy();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    async getAvailableSpots(req, res, next) {
        const { scheduleId } = req.params;

        try {
            const schedule = await Schedule.findByPk(scheduleId);
            if (!schedule) {
                throw ApiError.notFound('Schedule not found');
            }

            const bookedCount = await Booking.count({ where: { scheduleId } });
            const availableSpots = schedule.maxParticipants - bookedCount;

            res.json({ availableSpots });
        } catch (error) {
            next(error);
        }
    }

}

export default new ScheduleController();
