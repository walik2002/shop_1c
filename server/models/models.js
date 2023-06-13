import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING,allowNull: false},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    registrationDate: {type: DataTypes.DATE,defaultValue: DataTypes.NOW},
    role: {type: DataTypes.STRING,defaultValue: "USER"}
})

const Workout = sequelize.define('workout', {
    name: {type: DataTypes.STRING,allowNull: false},
    description: {type: DataTypes.TEXT},
    duration: {type: DataTypes.INTEGER},
    price: { type: DataTypes.DECIMAL(10, 2) }
});

// Определение модели "Тренер"
const Trainer = sequelize.define('trainer', {
    firstName: {type: DataTypes.STRING,allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    specialization: {type: DataTypes.STRING},
});

// Определение модели "Расписание"
const Schedule = sequelize.define('schedule', {
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    maxParticipants: { type: DataTypes.INTEGER, allowNull: false },
});


// Определение модели "Бронирование"
const Booking = sequelize.define('booking', {
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Ожидает обработки'},
});

User.hasMany(Booking);
Booking.belongsTo(User);

Workout.hasMany(Schedule);
Schedule.belongsTo(Workout);

Trainer.hasMany(Schedule);
Schedule.belongsTo(Trainer);

User.hasMany(Booking);
Booking.belongsTo(User);

Schedule.hasMany(Booking);
Booking.belongsTo(Schedule);


export {User,Workout,Trainer,Schedule,Booking};