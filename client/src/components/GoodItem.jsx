import React, {useContext, useState} from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom"
import {Button} from "react-bootstrap";
import {addGoodToBasket} from "../http/basketAPI";
import { Toast } from "react-bootstrap";
import {Context} from "../index";
const GoodItem = ({good}) => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const {user} = useContext(Context);

    const handleAddToBasket = async (goodId) => {
        try {
            console.log(goodId);
            const userId = 1; // замени на свой идентификатор пользователя
            await addGoodToBasket(user.user.id, goodId);
            setShowToast(true);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Col md={3}>
            <Card style={{cursor:"pointer"}} border = "dark" className="mt-3" onClick={()=>navigate("good" + "/" + good.id)}>
                <Card.Body>
                    <Card.Title>
                        Товар: {good.name}
                    </Card.Title>
                   <Card.Text>
                       Цена: {good.price}
                   </Card.Text>
                    <Button variant="outline-success" onClick={(e) => {e.stopPropagation(); handleAddToBasket(good.id)}}>Добавить в корзину</Button>
                </Card.Body>
            </Card>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                    background: "white",
                    zIndex:20,
                    position: "fixed",
                    top: "54px",
                    right: "0px",
                }}
            >
                <Toast.Header>
                    <strong className="me-auto">Уведомление</strong>
                </Toast.Header>
                <Toast.Body>Товар добавлен в корзину</Toast.Body>
            </Toast>
        </Col>
    );
};

export default GoodItem;