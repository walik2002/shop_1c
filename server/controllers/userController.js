import ApiError from "../error/apiError.js";
import bcrypt from "bcrypt"
import {User} from "../models/models.js";
import jwt from "jsonwebtoken"


function generateJwt(id,email,role,firstName,lastName){
    return jwt.sign(
        {id,firstName,lastName, email,role},
        process.env.SECRET_KEY,
        {expiresIn : '24h'}
    );
}
class UserController{
    async  registration(req, res, next) {
        const { firstName, lastName, email, password, phone } = req.body;

        try {
            if (!email || !password || !firstName || !lastName) {
                return next(ApiError.badRequest('Не все поля заполнены'));
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashPassword,
                phone,
            });

            const token = generateJwt(user.id, user.email, user.role,user.firstName,user.lastName);

            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async login(req,res,next){
        const {email,password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.badRequest('Пользователь с таким email не найден'));
        }

        let comparePassword = bcrypt.compareSync(password,user.password);

        if(!comparePassword)
        {
            return next(ApiError.badRequest('Неверные имя пользователя или пароль'));
        }
        const token = generateJwt(user.id,user.email,user.role,user.firstName,user.lastName)
        return  res.json({token});
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id,req.user.email,req.user.role,req.user.firstName,req.user.lastName);
        return res.json({token});
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ["password"] },
            });
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        const { firstName, lastName, email, password, phone,role } = req.body;
        try {
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashPassword,
                phone,
                role
            });
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        const { id } = req.params;
        const { firstName, lastName, email, password, phone,role } = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone = phone;
            user.role = role;
            if (password) {
                user.password = await bcrypt.hash(password, 5);
            }
            await user.save();
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            await user.destroy();
            return res.json({ message: 'Пользователь успешно удален' });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();