import React from 'react';
import {Accordion} from "react-bootstrap";
import {formatDate, formatTime} from "../utils/formaters";
import './css/BookingItem.css'
import {deleteBooking} from "../http/bookingAPI";
import {BOOKING_STATUSES} from "../utils/consts";
const BookingsItem = ({booking, handleCancelBooking, archive}) => {
    const {  status, createdAt, updatedAt, schedule } = booking;
    const { date, startTime, maxParticipants, workout } = schedule;
    const { name, description, duration,price } = workout;



    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header><div className="booking-header">{name +" "+ formatDate(date) +" " + formatTime(startTime)}</div></Accordion.Header>
                <Accordion.Body>
                    <div className="booking-item-body">
                        <div className="booking-info">
                            <p style={
                                status === BOOKING_STATUSES.PENDING? {color:"gray"}:
                                    status === BOOKING_STATUSES.CANCELED ? {color:"red"}:
                                        status === BOOKING_STATUSES.CONFIRMED ? {color:"yellowgreen"}: {}
                            }>Статус: {status}</p>
                            <h4>Дата и время:</h4>
                            <p>Дата: {date}</p>
                            <p>Время начала: {startTime}</p>
                            <h4>Информация о занятии:</h4>
                            <p>Назвнание: {name}</p>
                            <p>Описание: {description}</p>
                            <p>Длительность: {duration + " мин."}</p>
                            <p>Цена: <b>{price + " руб."}</b> </p>
                            <p>Максимальное количество участников: {maxParticipants}</p>
                        </div>

                        {
                            archive? '' : <button className="discard-btn" onClick={()=>handleCancelBooking(booking.id)}>Отменить бронь</button>
                        }

                    </div>

                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
};

export default BookingsItem;