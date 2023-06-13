import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const TrainerModal = ({onHide, show,modalContent,setModalContent}) => {

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
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Имя"}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, firstName:e.target.value}})}
                            value={modalContent.content.firstName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Фамилия..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, lastName:e.target.value}})}
                            value={modalContent.content.lastName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Описание тренера</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            placeholder={"Описание тренера..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, description:e.target.value}})}
                            value={modalContent.content.description}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Специализация</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Специализация..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, specialization:e.target.value}})}
                            value={modalContent.content.specialization}
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

export default TrainerModal;