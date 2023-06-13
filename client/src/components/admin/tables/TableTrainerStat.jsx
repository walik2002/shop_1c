import React, {useEffect, useState} from 'react';
import {formatDateExtend, formatTime} from "../../../utils/formaters";
import {getTrainerExtend, getTrainers} from "../../../http/trainerAPI";
import {Form} from "react-bootstrap";
import Select from "react-select";
import schedule from "../../../pages/Schedule";

const TableTrainerStat = ({tableRef,month,year,data}) => {
    const [trainersList, setTrainersList] = useState([]);
    const [selectedTrainer,setSelectedTrainer] = useState();
    const [trainerData, setTrainerData] = useState({});

    useEffect(function (){
        formTrainerList();
    },[]);

    useEffect(function () {

        fetchTrainerData()
    },[selectedTrainer,month,year])
    async function formTrainerList() {
        const data = await getTrainers();
        let trainersList = [];
        data.map(trainer => trainersList.push({label: trainer.firstName + " " + trainer.lastName, value: trainer.id}))

        setTrainersList(trainersList);
     }

     async function fetchTrainerData(){
         if(selectedTrainer && year && month){
             const data = await getTrainerExtend(selectedTrainer.value, year,month.value);
             setTrainerData(data);
         }
     }

    function handleSelectTrainer(data) {
        setSelectedTrainer(data);
    }

    function calcTotalCost(){
        let totalCost = 0;
        if(trainerData.schedules){
            trainerData.schedules.map(schedule =>{
                totalCost += schedule.workout.price * schedule.bookings.length;
            })
        }
        return totalCost;
    }
    return (
        <>
            <Form.Group>
                <Form.Label>Тренер</Form.Label>
                <Select
                    placeholder="Выберите тренера..."
                    isSearchable={true}
                    options={trainersList}
                    value={selectedTrainer}
                    onChange={handleSelectTrainer}
                />
            </Form.Group>

            <div ref={tableRef} className={"tableContainer"}>
                <h2 style={{textAlign:"center"}}>
                    Статистика по тренеру {selectedTrainer ? '\"'+selectedTrainer.label+ '\"': "..."} за {month ? month.label + ' '+ year:"..."}
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th>Занятие</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Количество броней</th>
                        <th>Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        trainerData.schedules && trainerData.schedules.map(schedule=>{
                            return <tr>
                                <td>
                                    {schedule.workout.name}
                                </td>
                                <td>
                                    {formatDateExtend(schedule.date)}
                                </td>

                                <td>
                                    {formatTime(schedule.startTime)}
                                </td>
                                <td>
                                    {schedule.bookings.length + " из " + schedule.maxParticipants}
                                </td>
                                <td>
                                    {
                                        (schedule.bookings.length * +schedule.workout.price).toFixed(2) + " руб."
                                    }
                                </td>
                            </tr>
                        })
                    }
                    <tr>
                        <td colSpan={4}></td>
                        <td > Общая сумма: {calcTotalCost().toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default TableTrainerStat;