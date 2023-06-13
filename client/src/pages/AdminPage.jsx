import React from 'react';
import '../css/AdminPage.css'
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {
    BOOKING_CONTROL,
    SCHEDULE_CONTROL,
    STAT_CONTROL,
    TRAINER_CONTROL,
    USER_CONTROL,
    WORKOUT_CONTROL
} from "../utils/consts";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-page">
            <h2>Панель администратора</h2>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(WORKOUT_CONTROL)}>Управление занятиями</Button>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(TRAINER_CONTROL)}>Управление тренерами</Button>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(SCHEDULE_CONTROL)}>Управление расписанием</Button>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(BOOKING_CONTROL)}>Управление бронями</Button>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(USER_CONTROL)}>Управление пользователями</Button>
            <Button className='admin-button' variant={"outline-dark"} onClick={()=>navigate(STAT_CONTROL)}>Статистика</Button>
        </div>
    );
};

export default AdminPage;