import React, {useEffect, useState} from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import {fetchOneGoods} from "../http/goodAPI";
import {useParams} from "react-router-dom";

const GoodPage = () => {
    const [good, setGood] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchOneGoods(id).then(
            data => setGood(data)
        )
    },[])

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Товар: {good.Наименование}
                    </Card.Title>
                    <Card.Text>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Количество на складе: {good.Количество +' '+ good.ЕдиницаИзмерения} </ListGroup.Item>
                            <ListGroup.Item>Цена: {good.Цена} BYN</ListGroup.Item>
                            <ListGroup.Item>Цена с учетом НДС: {good.ВсегоСНДС} BYN</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>


                </Card.Body>
            </Card>
        </Container>
    );
};

export default GoodPage;