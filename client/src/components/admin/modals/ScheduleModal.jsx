import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Select from "react-select";

const ScheduleModal = ({onHide, show,modalContent,setModalContent,workoutsList,trainersList}) => {

    const [selectedWorkout,setSelectedWorkout] = useState();
    const [selectedTrainer,setSelectedTrainer] = useState();
    const [isFormValid, setIsFormValid] = useState(false); // Состояние для проверки заполнения формы
    const [formErrors, setFormErrors] = useState(); // Состояние для хранения ошибок формы


    useEffect(function (){
        initWorkout();
        initTrainer();
        setFormErrors();
    },[show])
    function initWorkout(){
        const selected = workoutsList.find(workout=>workout.value === modalContent.content.workoutId);
        if(selected){
           setSelectedWorkout(selected);
           return;
        }
        setSelectedWorkout(null);
    }

    function initTrainer(){
        const selected = trainersList.find(trainer=> trainer.value === modalContent.content.trainerId);
        if(selected){
            setSelectedTrainer(selected);
            return;
        }
        setSelectedTrainer(null);
    }

    function handleSelectWorkout(data){
        setSelectedWorkout(data);
        setModalContent({...modalContent, content:{...modalContent.content, workoutId: data.value}});
    }

    function  handleSelectTrainer(data){
        setSelectedTrainer(data);
        setModalContent({...modalContent, content:{...modalContent.content, trainerId: data.value}});
    }
    function handleCreateOrUpdate() {
        const errors = {};

        if (!modalContent.content.date) {
            errors.date = "Пожалуйста, введите дату занятия.";
        }

        if (!modalContent.content.startTime) {
            errors.startTime = "Пожалуйста, введите время начала занятия.";
        }

        if (!modalContent.content.maxParticipants) {
            errors.maxParticipants = "Пожалуйста, введите максимальное количество участников.";
        }

        if (!selectedWorkout) {
            errors.selectedWorkout = "Пожалуйста, выберите занятие.";
        }

        if (!selectedTrainer) {
            errors.selectedTrainer = "Пожалуйста, выберите тренера.";
        }

        if (Object.keys(errors).length === 0) {
            setIsFormValid(true);
            setFormErrors({});
            modalContent.action({ ...modalContent.content });
        } else {
            setIsFormValid(false);
            setFormErrors(errors);
        }
    }

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
                        <Form.Label>Дата занятия</Form.Label>
                        <Form.Control
                            type={"date"}
                            placeholder={"Дата занятия..."}
                            value={modalContent.content.date}
                            onChange={(e)=>setModalContent({...modalContent,content:{...modalContent.content,date:e.target.value}})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Время начала занятия</Form.Label>
                        <Form.Control
                            type={"time"}
                            placeholder={"Описание занятия..."}
                            value={modalContent.content.startTime}
                            onChange={(e)=>setModalContent({...modalContent,content:{...modalContent.content,startTime:e.target.value}})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Максимальное количество участников</Form.Label>
                        <Form.Control
                            type={"number"}
                            placeholder={"Количество участников"}
                            value={modalContent.content.maxParticipants}
                            onChange={(e)=>setModalContent({...modalContent,content:{...modalContent.content,maxParticipants:e.target.value}})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Занятие</Form.Label>
                        <Select
                            options={workoutsList}
                            placeholder="Выберите занятие..."
                            isSearchable={true}
                            value={selectedWorkout}
                            onChange={handleSelectWorkout}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Тренер</Form.Label>
                        <Select
                            placeholder="Выберите тренера..."
                            isSearchable={true}
                            options={trainersList}
                            value={selectedTrainer}
                            onChange={handleSelectTrainer}
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
                <Button onClick={handleCreateOrUpdate}>
                    {modalContent.actionText}
                </Button>
            </Modal.Footer>
            {formErrors && (
                <div className="text-danger text-center mb-3">
                    {Object.values(formErrors).map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default ScheduleModal;