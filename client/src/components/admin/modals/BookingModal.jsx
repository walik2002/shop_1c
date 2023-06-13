import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Card, Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {formatDate, formatDateExtend, formatDateTime, formatTime} from "../../../utils/formaters";
import '../css/BookingModal.css'
import {BOOKING_STATUSES} from "../../../utils/consts";

const BookingModal = ({onHide, show,modalContent,setModalContent}) => {
    const {schedule,status,user,createdAt} = modalContent.content;
    const {date,startTime,workout,trainer} = schedule;

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
            show={show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalContent.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={"booking-modal"}>
                    <div>
                        {"Статус брони: " + status}
                    </div>
                    <div>
                        {"Дата брони: " + formatDateTime(createdAt)}
                    </div>


                    <h5>Информация о занятии: </h5>
                    <div>
                        Название: {workout ? workout.name : ''}
                    </div>
                    <div>
                        Дата и время
                        начала: {schedule && schedule.date && schedule.startTime ? formatDateExtend(schedule.date) + " " + formatTime(schedule.startTime) : ""}
                    </div>
                    <div>
                        Тренер: {trainer ? trainer.firstName + " " +trainer.lastName : ''}
                    </div>

                    <div>
                        Цена: {workout ? workout.price: ''} руб.
                    </div>

                    <h5>Информация о пользователе:</h5>
                    <div>
                        Имя и фамилия пользователя: {user? user.firstName + " " +user.lastName:""}
                    </div>
                    <div>
                        Email пользователя: {user? user.email : ''}
                    </div>

                    <div>
                        Телефон пользователя: {user? user.phone : ''}
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>

                <Button onClick={onHide} variant={"danger"}>Отмена</Button>

                <Button variant={"outline-dark"} onClick={()=>modalContent.action({...modalContent.content, status: BOOKING_STATUSES.CANCELED})}>Отменить бронь</Button>
                <Button onClick={()=>modalContent.action({...modalContent.content, status: BOOKING_STATUSES.CONFIRMED})}>{modalContent.actionText}</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;