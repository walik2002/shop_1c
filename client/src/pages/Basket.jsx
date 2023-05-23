import React, {useState, useEffect, useContext} from 'react';
import {getBasketGoods, removeGoodFromBasket} from "../http/basketAPI";
import {Context} from "../index";
import {Button, Card, Container, Toast} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {createOrder} from "../http/orderAPI";

const Basket = () => {
    const {user} = useContext(Context);
    const [basketGoods, setBasketGoods] = useState([]);
    const [totalAmount, setTotalAmount] = useState({price: 0, priceNDS: 0});
    const [toast, setToast] = useState({show:false, message: '', title: ''});
    function renderBasketGoods() {
        getBasketGoods(user.user.id)
            .then((data) => {
                setBasketGoods(data);
            });
    }

    useEffect(() => {
        renderBasketGoods();
    }, []);


    useEffect(() => {
        let sum = 0;
        let sumNDS = 0;
        basketGoods.map((good) => {
            sum += good.price;
            sumNDS += good.priceNDS;
        });
        setTotalAmount({ price: sum, priceNDS: sumNDS });
    }, [basketGoods]);



    const handleRemoveFromBasket = async (basketGoodId) => {
        try {

            await removeGoodFromBasket(user.user.id, basketGoodId);
            // Обновить список товаров в корзине
            renderBasketGoods();

        } catch (error) {
            console.log(error);
        }
    };
    const confirmOrder = async () => {
        const uniqueGoods = basketGoods.reduce((acc, good) => {
            const existingGood = acc.find((item) => item.id === good.goodId);

            if (existingGood) {
                existingGood.count++;
            } else {
                acc.push({ id: good.goodId, count: 1 });
            }

            return acc;
        }, []);

        const order = {
            totalAmount: totalAmount.price,
            totalAmountNDS: totalAmount.priceNDS,
            goods: uniqueGoods,
        };

        await createOrder(user.user.id, order)
            .then((data)=>{
                toast.title = "Уведомление";
                toast.message = data.message;
                toast.show=true;
            })
            .catch((data)=>{
                console.log(data);
                toast.title = "Ошибка";
                toast.message = data.response.data.error;
                toast.show=true;
            });
        renderBasketGoods();
    };


    return (
        <Container>
            <h2>Basket</h2>
            {basketGoods.map((good) => (
                <Card key={good.id}>
                    <Card.Body>
                        <Card.Title>{good.name}</Card.Title>
                        <Card.Text>Цена: {good.price} руб.</Card.Text>
                        <Card.Text>Цена с учетом НДС: {good.priceNDS} руб.</Card.Text>
                        <Button variant="outline-danger" onClick={() => handleRemoveFromBasket(good.id)}>Удалить</Button>
                    </Card.Body>
                </Card>
            ))}

            <Container  style={{background: "lightgray", padding: 30}}>
                <Row>
                    <Col>
                        <h5>Общая сумма: {totalAmount.price}</h5>
                        <h5>Общая сумма с учетом НДC {totalAmount.priceNDS}</h5>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" onClick={()=>confirmOrder()}>
                            Оформить заказ
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Toast
                onClose={() => setToast({...toast,show:false})}
                show={toast.show}
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
                    <strong className="me-auto">{toast.title}</strong>
                </Toast.Header>
                <Toast.Body>{toast.message}</Toast.Body>
            </Toast>

        </Container>
    );
};

export default Basket;
