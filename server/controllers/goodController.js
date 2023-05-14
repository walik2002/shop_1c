import {Good} from "../models/models.js"
class GoodController{
    async create(req,res){
        const {name,price} = req.body;
        const good =  await Good.create({name,price})
        return res.json(good)
    }

    async getAll(req,res){
        const goods = await Good.findAll();

        return res.json(goods);
    }

    async getOne(req,res){
        const {id} = req.params
        const good = await Good.findOne({where: {id}})

        return res.json(good);
    }
}

export default new GoodController();