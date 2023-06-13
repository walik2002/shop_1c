import React, {useEffect, useState} from 'react';
import {getWorkoutsExtend} from "../../../http/workoutAPI";

const TableWorkoutStat = ({tableRef,data,month,year}) => {
    const [workouts,setWorkouts] = useState([]);
    const [filteredData,setFilteredData] = useState([]);

    useEffect(function (){
        fetchWorkoutsExtend()

    },[month,year])
    async function fetchWorkoutsExtend() {
        if(month && year){
            const data = await getWorkoutsExtend(year,month.value);
            setWorkouts(data);
        }


    }

    function calculateStats(data) {
        const stats = {
            totalBookings: 0,
            totalCost: 0,
            trainers: {}
        };

        if(data.schedules){
            // Перебираем все расписания
            data.schedules.forEach(schedule => {
                const trainerId = schedule.trainer.id;

                // Проверяем, есть ли тренер в объекте статистики,
                // если нет, то добавляем его с начальными значениями
                if (!stats.trainers.hasOwnProperty(trainerId)) {
                    stats.trainers[trainerId] = {
                        name: schedule.trainer.firstName + " " + schedule.trainer.lastName,
                        bookings: 0,
                        cost: 0,
                        hours: 0
                    };
                }
                console.log(data);
                stats.trainers[trainerId].hours += data.duration/60;
                // Перебираем все брони для данного расписания
                schedule.bookings.forEach(booking => {
                    // Увеличиваем общее количество броней и общую стоимость
                    stats.totalBookings++;
                    stats.totalCost += +data.price;

                    // Увеличиваем количество броней и стоимость для данного тренера
                    stats.trainers[trainerId].bookings++;
                    stats.trainers[trainerId].cost += +data.price;

                });
            });

            console.log(stats);
            return stats;
        }

    }

    return (
        <div ref={tableRef}  className={"tableContainer"}>
            <h2 style={{textAlign:"center"}}>Статистика по занятиям за {month&&month.label + ' '+ year}</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            Занятие
                        </th>
                        <th>Тренер</th>
                        <th>Количество броней</th>
                        <th>Количество часов</th>
                        <th>Общая сумма</th>
                    </tr>
                </thead>
                <tbody>
                {workouts.map(item=>{
                    return <>
                        {
                            Object.entries(calculateStats(item).trainers).map(([key,trainer],index)=>{
                                console.log(Object.keys(calculateStats(item).trainers).length)
                                return <tr>
                                    {
                                        index == 0 ?
                                            <td rowSpan={Object.keys(calculateStats(item).trainers).length} >
                                                {item.name}
                                            </td>
                                            :''
                                    }

                                    <td>
                                        {trainer.name}
                                    </td>
                                    <td>
                                        {trainer.bookings}
                                    </td>
                                    <td>
                                        {
                                            (trainer.hours).toFixed(2)
                                        }
                                    </td>
                                    <td>
                                        {(trainer.cost).toFixed(2) + "руб."}
                                    </td>
                                </tr>
                            })

                        }

                    </>
                })}
                </tbody>
            </table>
        </div>
    );
};
export default TableWorkoutStat;