import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import {Context} from "../index";
import GoodItem from "./GoodItem";

const GoodList = observer(( )=> {
    const {goods} = useContext(Context);
    console.log(goods);

    return (
        <Row className="d-flex">
            {goods.goods.map(good => {
               return <GoodItem key = {good.id} good = {good}/>
            })}
        </Row>
    );
});

export default GoodList;