import {Booking, Schedule, Trainer, Workout} from '../models/models.js';
import ApiError from '../error/apiError.js';
import {Op, Sequelize} from "sequelize";

class WorkoutController {
    async getAllWorkouts(req, res, next) {
        try {
            const workouts = await Workout.findAll();
            res.json(workouts);
        } catch (error) {
            next(error);
        }
    }

    async getAllWorkoutsWithBindData(req, res, next) {
        const { year, month } = req.body;

        try {
            const workouts = await Workout.findAll({
                include: [
                    {
                        model: Schedule,
                        include: [
                            {
                                model: Booking,
                                required: true,
                            },
                            {
                                model: Trainer,
                            },
                        ],
                        where: {
                            date: {
                                [Op.and]: [
                                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), +year),
                                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), +month + 1),
                                ],
                            },
                        }, // Добавляем фильтр, чтобы попадали только schedules с bookings
                    },
                ],
            });

            res.json(workouts);
        } catch (error) {
            next(error);
        }
    }



    async getWorkoutById(req, res, next) {
        const { id } = req.params;

        try {
            const workout = await Workout.findByPk(id);
            if (!workout) {
                throw ApiError.notFound('Workout not found');
            }
            res.json(workout);
        } catch (error) {
            next(error);
        }
    }

    async createWorkout(req, res, next) {
        const { name, description, duration,price } = req.body;

        try {
            const workout = await Workout.create({ name, description, duration,price });
            res.status(201).json(workout);
        } catch (error) {
            next(error);
        }
    }

    async updateWorkout(req, res, next) {
        const { id } = req.params;
        const { name, description, duration,price } = req.body;

        try {
            const workout = await Workout.findByPk(id);
            if (!workout) {
                throw ApiError.notFound('Workout not found');
            }

            await workout.update({ name, description, duration,price });

            res.json(workout);
        } catch (error) {
            next(error);
        }
    }

    async deleteWorkout(req, res, next) {
        const { id } = req.params;

        try {
            const workout = await Workout.findByPk(id, { include: Schedule });
            if (!workout) {
                throw ApiError.notFound('Workout not found');
            }

            // Удаление связанных расписаний
            const scheduleIds = workout.schedules.map(schedule => schedule.id);
            await Booking.destroy({ where: { scheduleId: scheduleIds } });
            await Schedule.destroy({ where: { workoutId: id } });

            // Удаление тренировочного занятия
            await workout.destroy();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}

export default new WorkoutController();
