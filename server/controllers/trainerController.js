import {Booking, Schedule, Trainer, Workout} from '../models/models.js';
import ApiError from '../error/apiError.js';
import {Op, Sequelize} from "sequelize";

class TrainerController {
    async getAllTrainers(req, res, next) {
        try {
            const trainers = await Trainer.findAll();
            res.json(trainers);
        } catch (error) {
            next(error);
        }
    }

    async  getTrainerByIdExtend(req, res, next) {
        const {year,month} = req.body;
        const {id} = req.params;

        try {
            const trainers = await Trainer.findByPk(id,{
                include: [
                    {
                        model: Schedule,
                        include: [
                            { model: Workout },
                            { model: Booking ,required:true}
                        ],
                        where: {
                            date: {
                                [Op.and]: [
                                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), + year),
                                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), + month + 1),
                                ],
                            },
                        }
                    }
                ]
            });

            res.json(trainers);
        } catch (error) {
            next(error);
        }
    }


    async getTrainerById(req, res, next) {
        const { id } = req.params;

        try {
            const trainer = await Trainer.findByPk(id);
            if (!trainer) {
                throw ApiError.notFound('Trainer not found');
            }
            res.json(trainer);
        } catch (error) {
            next(error);
        }
    }

    async createTrainer(req, res, next) {
        const { firstName, lastName, description, specialization } = req.body;

        try {
            const trainer = await Trainer.create({ firstName, lastName, description, specialization });
            res.status(201).json(trainer);
        } catch (error) {
            next(error);
        }
    }

    async updateTrainer(req, res, next) {
        const { id } = req.params;
        const { firstName, lastName, description, specialization } = req.body;

        try {
            const trainer = await Trainer.findByPk(id);
            if (!trainer) {
                throw ApiError.notFound('Trainer not found');
            }

            await trainer.update({ firstName, lastName, description, specialization });

            res.json(trainer);
        } catch (error) {
            next(error);
        }
    }

    async deleteTrainer(req, res, next) {
        const { id } = req.params;

        try {
            const trainer = await Trainer.findByPk(id, { include: Schedule });
            if (!trainer) {
                throw ApiError.notFound('Trainer not found');
            }

            // Удаление связанных расписаний
            const scheduleIds = trainer.schedules.map(schedule => schedule.id);
            await Booking.destroy({ where: { ScheduleId: scheduleIds } });
            await Schedule.destroy({ where: { TrainerId: id } });

            // Удаление тренера
            await trainer.destroy();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}

export default new TrainerController();
