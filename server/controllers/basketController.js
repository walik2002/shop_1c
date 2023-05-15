import {Basket, BasketGood, Good, User} from "../models/models.js";

class BasketController {
    async  addToBasket(req, res) {
        const { userId, goodId } = req.body;

        try {
            // Получить пользователя и корзину по ID пользователя
            const user = await User.findByPk(userId, { include: Basket });
            const basket = user.basket;

            // Создать новую запись в таблице basket_goods для связи товара с корзиной
            await BasketGood.create({ basketId: basket.id, goodId });

            // Вернуть успешный ответ
            res.status(200).json({ message: "Товар успешно добавлен в корзину" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getBasketGoods(req, res) {
        const { userId } = req.body;

        try {
            // Получить пользователя и корзину по ID пользователя
            const user = await User.findByPk(userId, { include: Basket });
            const basket = user.basket;

            // Получить все записи в таблице basket_goods, связанные с корзиной пользователя
            const basketGoods = await BasketGood.findAll({ where: { basketId: basket.id }, include: Good });

            // Вернуть список товаров в корзине
            res.status(200).json(basketGoods);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async  deleteFromBasket(req, res) {
        const { userId, goodId } = req.body;

        try {
            // Получить пользователя и корзину по ID пользователя
            const user = await User.findByPk(userId, { include: Basket });
            const basket = user.basket;

            // Удалить запись из таблицы basket_goods, связанную с корзиной пользователя и товаром
            await BasketGood.destroy({ where: { basketId: basket.id, id: goodId } });

            // Вернуть успешный ответ
            res.status(200).json({ message: "Товар успешно удален из корзины" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

}

export default new BasketController();