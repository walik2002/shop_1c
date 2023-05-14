import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING,defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey : true, autoIncrement: true}
})

const Good = sequelize.define('good',{
    id: {type: DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
    price: {type: DataTypes.INTEGER, defaultValue: 0}
})

const BasketGood = sequelize.define('basket_good',{
    id: {type: DataTypes.INTEGER, primaryKey : true, autoIncrement: true}
})

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketGood);
BasketGood.belongsTo(Basket);

Good.hasMany(BasketGood);
BasketGood.belongsTo(Good);

export default {User,Basket,Good,BasketGood};