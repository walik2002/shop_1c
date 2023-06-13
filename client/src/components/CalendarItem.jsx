import React, { useState } from 'react';
import './css/CalendarItem.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {observer} from "mobx-react-lite";
import {getAvailableSpots} from "../http/scheduleAPI";

const CalendarItem =observer(({ className, scheduleData, setModalContent,setModalShow, handleContextMenuClick }) => {
    async function handleClick(scheduleData) {
        const {availableSpots} = await getAvailableSpots(scheduleData.id);
        setModalContent({...scheduleData, availableSpots});
        setModalShow(true)
    }

    return (
        <div
            className={className}
            onClick={()=>handleClick(scheduleData)}
            onContextMenu={handleContextMenuClick}
        >
            <div className="time">{scheduleData.startTime.split(':')[0] + ':' + scheduleData.startTime.split(':')[1]}</div>
            <div className="title">{scheduleData.workout.name}</div>
            <div className="trainer-name">{scheduleData.trainer.firstName + ' ' + scheduleData.trainer.lastName}</div>
            <div className="price"> {scheduleData.workout.price} руб.</div>
        </div>
    );
});
export default CalendarItem;
