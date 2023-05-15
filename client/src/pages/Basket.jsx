import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {getBasketGoods, removeGoodFromBasket} from "../http/basketAPI";
import {Context} from "../index";
import {Button, Card, Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";

const Basket = () => {
    const {user} = useContext(Context);
    const [basketGoods, setBasketGoods] = useState([]);

    useEffect(() => {
        getBasketGoods(user.user.id)
            .then(data=> setBasketGoods(data))
    }, []);



    const handleRemoveFromBasket = async (basketGoodId) => {
        try {

            await removeGoodFromBasket(user.user.id, basketGoodId);
            // Обновить список товаров в корзине
            getBasketGoods(user.user.id)
                .then(data=> setBasketGoods(data))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h2>Basket</h2>
            {basketGoods.map((good) => (
                <Card key={good.id}>
                    <Card.Body>
                        <Card.Title>{good.good.name}</Card.Title>
                        <Card.Text>{good.good.price} руб.</Card.Text>
                        <Button variant="outline-danger" onClick={() => handleRemoveFromBasket(good.id)}>Удалить</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default Basket;
