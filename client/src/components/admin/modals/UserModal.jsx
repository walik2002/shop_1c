import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const UserModal = ({onHide, show,modalContent,setModalContent}) => {

    const [selectedRole,setSelectedRole] = useState();

    const roleList = [
        { value: 'USER', label: 'Обычный пользователь' },
        { value: 'ADMIN', label: 'Администратор' }
    ];

    useEffect(function (){
        initRole();
    },[show])
    function initRole(){
        const selected = roleList.find(role=>role.value === modalContent.content.role);
        if(selected){
            setSelectedRole(selected);
        }
    }




    function handleSelectRole(data){
        setSelectedRole(data);
        setModalContent({...modalContent, content:{...modalContent.content, role: data.value}});
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
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Имя пользователя..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, firstName:e.target.value}})}
                            value={modalContent.content.firstName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Фамилия пользователя</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder={"Фамилия пользователя..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, lastName:e.target.value}})}
                            value={modalContent.content.lastName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type={"email"}
                            placeholder={"Email..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, email:e.target.value}})}
                            value={modalContent.content.email}
                        />
                    </Form.Group>

                    {
                        modalContent.actionText ==="Создать"
                            ?
                            <Form.Group>
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    autocomplete={"off"}
                                    type={"text"}
                                    placeholder={"Пароль пользователя..."}
                                    onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, password:e.target.value}})}
                                    value={modalContent.content.password}
                                />
                            </Form.Group>
                            :''
                    }
                    <Form.Group>
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type={"tel"}
                            placeholder={"Номер телефона..."}
                            onChange={(e) => setModalContent({...modalContent, content:{...modalContent.content, phone:e.target.value}})}
                            value={modalContent.content.phone}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Роль</Form.Label>
                        <Select
                            placeholder="Выберите роль..."
                            isSearchable={true}
                            isMulti={false}
                            options={roleList}
                            value={selectedRole}
                            onChange={handleSelectRole}
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

export default UserModal;