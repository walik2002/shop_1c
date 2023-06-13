import React, {useEffect, useState} from 'react';
import './css/AdminControl.css'
import AdminControlHeader from "./AdminControlHeader";
import AdminControlTable from "./AdminControlTable";
import {deleteSchedule, getActualSchedule, getSchedule, postSchedule, putSchedule} from "../../http/scheduleAPI";
import {formatDateExtend, formatTime} from "../../utils/formaters";
import ScheduleModal from "./modals/ScheduleModal";
import { fetchWorkouts} from "../../http/workoutAPI";
import {getTrainers} from "../../http/trainerAPI";
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import './css/ScheduleControl.css'

const fields = ["Дата", "Время","Макс. кол-во участников","Тренер","Занятие","Уже забронировано"];
export async function formWorkoutOptionsList(){
    const workouts = await fetchWorkouts();
    let workoutList = [];
    workouts.map(workout=>{
        workoutList.push({value: workout.id, label: workout.name})
    })

    return workoutList;
}

export async function formTrainersOptionList(){
    const trainers = await getTrainers();
    let trainerList = [];
    trainers.map(trainer =>{
        trainerList.push({label: trainer.firstName + " " + trainer.lastName,value: trainer.id})
    })

    return trainerList;
}
const ScheduleControl = () => {
    const [schedules,setSchedules] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState({content:{
            date: new Date(),
            startTime:'',
            maxParticipants:0,
            trainerId:0,
            workoutId:0,
        }});
    const [workoutList,setWorkoutList] = useState([]);
    const [trainerList,setTrainerList] = useState([]);

    const [searchWord,setSearchWord] = useState('');
    const [filteredSchedules,setFilteredSchedules] = useState(schedules);
    const [sortCriteria, setSortCriteria] = useState('date');



    useEffect(function (){
      fetchSchedules();
      formWorkoutOptionsList().then(data=>{
          console.log(data);
          setWorkoutList(data);
      });
      formTrainersOptionList().then(data=>{
          console.log(data);
          setTrainerList(data);
      })
    },[])

    useEffect(function (){
        const filteredSchedulesByWorkoutName = schedules.filter(schedule => schedule.workout.name.toLowerCase().includes(searchWord.toLowerCase()));
        const filteredSchedulesByTrainerName = schedules.filter(schedule => {
            let trainerFullName = schedule.trainer.firstName + schedule.trainer.lastName;
            return trainerFullName.toLowerCase().includes(searchWord.toLowerCase())
        });

        const filteredSchedules = Array.from(new Set(filteredSchedulesByTrainerName.concat(filteredSchedulesByWorkoutName)));
        setFilteredSchedules(filteredSchedules);
    },[searchWord])


    useEffect(function () {
       setFilteredSchedules(sortSchedules(sortCriteria));
    }, [sortCriteria, filteredSchedules]);

    async function fetchSchedules (){
        const data = await getSchedule();
        setSchedules(data);
        setFilteredSchedules(data);
    }

    async function fetchActualSchedules (){
        const data = await getActualSchedule();
        setSchedules(data);
        setFilteredSchedules(data);
    }


    function handleClickOpenModal(title, actionText,action, content,isCreate){
        if(isCreate)
        {
            setModalContent({title,actionText,action,content:{
                    date: new Date(),
                    startTime:'',
                    maxParticipants:0,
                    trainerId:0,
                    workoutId:0,
                }});
        }
        else {
            setModalContent({title,actionText,action,content});
        }

        setShowModal(true);
    }

    async function createNewSchedule(schedule){
        const data = await postSchedule(schedule);
        setShowModal(false);
        fetchSchedules();
    }

    async function changeExistingSchedule(schedule,isDelete){
        if(!isDelete){
            const  data = await putSchedule(schedule);
        }else {
            const data = await deleteSchedule(schedule.id);
        }
        setShowModal(false);
        fetchSchedules();
    }

    function sortSchedules(criteria) {
        let sortedSchedules = [];
        if (criteria === "date") {
            sortedSchedules = filteredSchedules.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
        }
        if(criteria ==="workouts"){
            sortedSchedules = filteredSchedules.sort((a,b)=>a.workout.name.localeCompare(b.workout.name));
        }

        if(criteria === "trainers"){

            sortedSchedules = filteredSchedules.sort((a,b)=> {
                let nameA = a.trainer.firstName + a.trainer.lastName;
                let nameB = b.trainer.firstName + a.trainer.lastName;

                return nameA.localeCompare(nameB);
            })
        }
        setSortCriteria(criteria);
        console.log(sortedSchedules);
        return sortedSchedules;
    }

    return (
        <>
            <div className={'admin-control'}>
                <AdminControlHeader
                    title={'Список расписаний'}
                    clickCreateButton={() => {
                        handleClickOpenModal("Новое расписание", "Создать", createNewSchedule, true)
                    }}
                    setSearchWord = {setSearchWord}
                    searchWord = {searchWord}
                />
                <div className={'admin-schedule-actions'}>
                    <DropdownButton variant={"secondary"} title={"Опции"} className={"mt-0"}>
                        <DropdownItem onClick={fetchActualSchedules}>
                            Получить актуальное расписание
                        </DropdownItem>
                        <DropdownItem onClick={fetchSchedules}>
                            Получить все записи расписания
                        </DropdownItem>
                    </DropdownButton>

                    <DropdownButton variant={"secondary"} title={"Сортировка"} className={"mt-0"}>
                        <DropdownItem onClick={()=>sortSchedules('date')}>
                            По дате
                        </DropdownItem>
                        <DropdownItem onClick={()=>sortSchedules('workouts')}>
                            По занятиям
                        </DropdownItem>
                        <DropdownItem onClick={()=>sortSchedules('trainers')}>
                            По тренерам
                        </DropdownItem>
                    </DropdownButton>
                </div>

                <AdminControlTable tableData={filteredSchedules} fields = {fields} >
                    <tbody>
                    {
                        filteredSchedules.map((schedule) => {
                            return <tr key={schedule.id}>
                                {
                                    Object.entries(schedule).map(([key, value]) =>
                                        !key.toLowerCase().includes("id") && key != "createdAt" && key != "updatedAt" &&
                                        <td key={key}>{
                                            key === "date" ? formatDateExtend(value) :
                                                key === "startTime" ? formatTime(value) :
                                                    key === "trainer" ? value.firstName + " " + value.lastName :
                                                        key === "workout" ? value.name : value
                                        }</td>)
                                }
                                <td
                                    className={'td-control'}
                                    onClick={()=>handleClickOpenModal("Редактирование занятия","Изменить",changeExistingSchedule,schedule)}
                                >
                                    Управлять
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </AdminControlTable>
            </div>

            <ScheduleModal
                show = {showModal}
                onHide={()=>setShowModal(false)}
                modalContent = {modalContent}
                setModalContent = {setModalContent}
                workoutsList={workoutList}
                trainersList={trainerList}
            />
        </>
    );
};

export default ScheduleControl;