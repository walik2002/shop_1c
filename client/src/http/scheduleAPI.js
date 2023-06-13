import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";
import schedule from "../pages/Schedule";

export const getSchedule = async () => {
    const {data} = await $host.get('api/schedule');
    return data;
}

export const getActualSchedule = async () => {
    const {data} = await $host.post('api/schedule/actual');
    return data;
}

export const getAvailableSpots = async (id)=>{
    const {data} = await  $host.get('api/schedule/' + id +'/available-spots');
    return data;
}

export const getScheduleRange = async (startDate,endDate) => {
    const {data} = await $host.post('api/schedule/range', {startDate,endDate});
    console.log(data);
    return data;
}

export const postSchedule = async (schedule) => {
    const {data} = await $authHost.post('/api/schedule', {...schedule});
    return data;
}

export const deleteSchedule = async (scheduleId) =>{
    const {data} = await  $authHost.delete('/api/schedule/' + scheduleId);
    return data;
}

export const putSchedule = async (schedule)=>{
    const {data} = await  $authHost.put('/api/schedule/' + schedule.id,{...schedule});
    return data;
}