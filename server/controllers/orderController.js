import {createOrder} from "../http/ordersAPI.js";
import {Basket, BasketGood, User} from "../models/models.js";

class OrderController{
    async createOrder(req, res) {
        const {userId, order} = req.body;

        try{
            const data = await createOrder(order);
            console.log(data);
            const user = await User.findByPk(userId, { include: Basket });
            const basket = user.basket;

            await BasketGood.destroy({ where: { basketId: basket.id }})

            return res.status(200).json({message: data});
        }catch (error) {
            return res.status(400).json({error: "Недостаточное количество товара"});
        }



    }
}
export default new OrderController();