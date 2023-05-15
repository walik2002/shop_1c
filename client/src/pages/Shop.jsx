import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import GoodList from "../components/GoodList";
import {Context} from "../index";
import {fetchGoods} from "../http/goodAPI";
import {observer} from "mobx-react-lite";

const Shop = observer(() => {

    const {goods} = useContext(Context);

    useEffect(()=>{
        fetchGoods().then(
            data => {
                console.log(data);
                goods.setGoods(data)
            }
        )
    },[])

    return (
        <Container>
            Товары
            <Row>
                <Col>
                    <GoodList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;