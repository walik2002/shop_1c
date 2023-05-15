import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";
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
                        Товар: {good.name}
                    </Card.Title>
                    <Card.Text>
                        Цена: {good.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default GoodPage;