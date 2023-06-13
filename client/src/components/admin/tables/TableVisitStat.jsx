import React, {useEffect, useRef, useState} from 'react';
import {formatDateExtend} from "../../../utils/formaters";

const TableVisitStat = ({tableRef,data,month,year}) => {
    const [totalAmount,setTotalAmount] = useState(0);
    const [filteredData,setFilteredData] = useState([...data]);


    useEffect(function (){
        calcTotalAmount();
        const filteredData = data.sort((a,b) =>{
            const dateA = new Date(a.schedule.date);
            const dateB = new Date(b.schedule.date);
            return dateA - dateB;
        })
        setFilteredData(filteredData);
    },[data])

    function calcTotalAmount(){
        let totalAmount = 0;
        data.map(item => totalAmount+= +item.schedule.workout.price);
        setTotalAmount(totalAmount);
    }

    return (
        <div ref={tableRef}  className={"tableContainer"}>
            <h2 style={{textAlign:"center"}}>Статистика бронирований за {month&&month.label + ' '+ year}</h2>
            <table>
                <thead>
                <tr>
                    <th>Клиент</th>
                    <th>Занятие</th>
                    <th>Тренер</th>
                    <th>Дата</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredData.map(item => {
                        return <tr>
                            <td>{item.user.firstName + " " + item.user.lastName}</td>
                            <td>{item.schedule.workout.name}</td>
                            <td>{item.schedule.trainer.firstName + " " + item.schedule.trainer.lastName}</td>
                            <td>{formatDateExtend(item.schedule.date)}</td>
                            <td>{item.schedule.workout.price + " руб."}</td>
                        </tr>
                    })
                }
                <tr className={"last-row"}>
                    <td colSpan={3}></td>
                    <td colSpan={2}> Общая сумма: {totalAmount} руб.</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableVisitStat;