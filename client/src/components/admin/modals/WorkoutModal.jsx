import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {getTrainers} from "../../../http/trainerAPI";

const WorkoutModal = ({onHide, show,modalContent,setModalContent}) => {

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
                    <Form>
                        <Form.Group>
                            <Form.Label>Название занятия</Form.Label>
                            <Form.Control
                            type={"text"}
                            placeholder={"Название занятия..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, name:e.target.value}})}
                            value={modalContent.content.name}
                        />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Описание занятия</Form.Label>
                            <Form.Control
                                as={'textarea'}
                                placeholder={"Описание занятия..."}
                                onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, description:e.target.value}})}
                                value={modalContent.content.description}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Длительность</Form.Label>
                            <Form.Control
                                type={"number"}
                                placeholder={"Длительность, мин..."}
                                onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, duration:e.target.value}})}
                                value={modalContent.content.duration}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type={"text"}
                                placeholder={"Введите в формате 100.00"}
                                onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, price:e.target.value}})}
                                value={modalContent.content.price}
                            />
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>

                <Button onClick={onHide} variant={"danger"}>Отмена</Button>
                {

                    modalContent.actionText !=="Создать"
                        ?

                            <Button variant={"outline-dark"} onClick={()=>modalContent.action(modalContent.content,true)}>Удалить</Button>
                        :
                        ''
                }
                <Button onClick={()=>modalContent.action(modalContent.content)}>{modalContent.actionText}</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default WorkoutModal;