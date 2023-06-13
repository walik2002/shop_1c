import React, {useEffect, useState} from 'react';
import './css/AdminControl.css'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import {getBookings} from "../../http/bookingAPI";
import TableContainer from "./tables/TableContainer";

const StatControl = () => {
    const [bookings,setBookings] = useState([]);
    const [table,setTable] = useState('');

    useEffect(function (){
        fetchBookings();
    },[])

    async function fetchBookings(){
        const data = await getBookings();
        setBookings(data);
    }


    return (
        <div className={"admin-control stat"}>
            <div className={'admin-control-header'}>
                <h2>Статистика</h2>
                <div className={'admin-control-header-controls'}>
                    <div className={'admin-schedule-actions'}>
                        <DropdownButton variant={"secondary"} title={"Получить"} className={"mt-0"}>
                            <DropdownItem onClick={()=>setTable('visitStat')}>
                                Статистику посещений
                            </DropdownItem>
                            <DropdownItem onClick={()=>setTable('workoutStat')}>
                                Статистика по занятиям
                            </DropdownItem>
                            <DropdownItem onClick={()=>setTable('trainerStat')}>
                                Статистика по тренерам
                            </DropdownItem>
                        </DropdownButton>
                    </div>
                </div>
            </div>
            {
                table && <TableContainer tableData={bookings} tableVariant = {table}/>
            }





        </div>
    );
};

export default StatControl;