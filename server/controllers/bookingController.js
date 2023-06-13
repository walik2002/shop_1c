import {Booking, User, Schedule, Workout, Trainer} from '../models/models.js';
import ApiError from '../error/apiError.js';

class BookingController {
    async getAllBookings(req, res, next) {
        try {
            const bookings = await Booking.findAll({
                include: [
                    { model: User },
                    { model: Schedule, include: [Workout, Trainer] }
                ],
                order: [
                    ['createdAt', 'ASC'], // Сортировка по возрастанию даты
                ]
            });
            res.json(bookings);
        } catch (error) {
            next(error);
        }
    }


    async getBookingById(req, res, next) {
        const { id } = req.params;

        try {
            const booking = await Booking.findByPk(id, {
                include: [User, Schedule],
            });
            if (!booking) {
                throw ApiError.notFound('Booking not found');
            }
            res.json(booking);
        } catch (error) {
            next(error);
        }
    }

    async createBooking(req, res, next) {
        const { status, userId, scheduleId } = req.body;

        try {
            const schedule = await Schedule.findByPk(scheduleId);
            if (!schedule) {
                throw ApiError.notFound('Schedule not found');
            }

            const bookedCount = await Booking.count({ where: { scheduleId } });
            if (bookedCount >= schedule.maxParticipants) {
                throw ApiError.badRequest('Нет доступных мест для бронирования');
            }

            const currentTime = new Date();
            const scheduleTime = new Date(schedule.date + ' ' + schedule.startTime);
            if (currentTime > scheduleTime) {
                throw ApiError.badRequest('Время бронирования уже истекло');
            }

            // Проверка, бронировал ли пользователь уже данное занятие
            const existingBooking = await Booking.findOne({
                where: {
                    userId,
                    scheduleId,
                },
            });
            if (existingBooking) {
                throw ApiError.badRequest('Вы уже забронировали это занятие');
            }

            const booking = await Booking.create({ status, userId, scheduleId });

            // Fetch associated user and schedule
            const user = await User.findByPk(userId);

            booking.dataValues.user = user;
            booking.dataValues.schedule = schedule;

            res.status(201).json(booking);
        } catch (error) {
            next(error);
        }
    }



    async updateBooking(req, res, next) {
        const { id } = req.params;
        const { status, userId, scheduleId } = req.body;

        try {
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw ApiError.notFound('Booking not found');
            }

            await booking.update({ status, userId, scheduleId });

            // Fetch associated user and schedule
            const user = await User.findByPk(userId);
            const schedule = await Schedule.findByPk(scheduleId);

            booking.dataValues.user = user;
            booking.dataValues.schedule = schedule;

            res.json(booking);
        } catch (error) {
            next(error);
        }
    }

    async deleteBooking(req, res, next) {
        const { id } = req.params;

        try {
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw ApiError.notFound('Booking not found');
            }

            await booking.destroy();

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    async getBookingsByUserId(req, res, next) {
        const { userId } = req.params;

        try {
            const bookings = await Booking.findAll({
                where: { userId },
                include: [{ model: Schedule, include: [Workout] }],
                order: [[{ model: Schedule }, 'date', 'ASC'], [{ model: Schedule }, 'startTime', 'ASC']],
            });

            res.json(bookings);
        } catch (error) {
            next(error);
        }
    }

    async checkBooking(req, res, next) {
        const { userId, scheduleId } = req.body;

        try {
            const booking = await Booking.findOne({
                where: {
                    userId,
                    scheduleId,
                },
            });

            if (booking) {
                res.json({ booked: true });
            } else {
                res.json({ booked: false });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new BookingController();
