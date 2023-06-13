import React, {useContext, useEffect, useState} from 'react';
import './css/Calendar.css';
import {deleteSchedule, getScheduleRange, postSchedule, putSchedule} from "../http/scheduleAPI";
import CalendarLine from "./CalendarLine";
import {observer} from "mobx-react-lite";
import button from "bootstrap/js/src/button";
import Modal from "react-bootstrap/Modal";
import {Context} from "../index";
import {checkBooking, postBooking} from "../http/bookingAPI";
import {Toast} from "react-bootstrap";
import CustomContextMenu from "./admin/CustomContextMenu";
import ScheduleModal from "./admin/modals/ScheduleModal";
import {formTrainersOptionList, formWorkoutOptionsList} from "./admin/ScheduleControl";

const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('ru-RU', options);
};
const Calendar = observer(() => {
    const {user} = useContext(Context);

    const [modalShow,setModalShow] = useState(false);
    const [schedules, setSchedules] = useState({});
    const [modalContent,setModalContent] = useState({});
    const [showToast,setShowToast] = useState(false);
    const [error,setError] = useState('');
    const [dates,setDates] = useState([]);
    const [page, setPage] = useState(0);
    const [showContext,setShowContext] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuContent, setMenuContent] = useState({});

    const [showModalAdmin,setShowModalAdmin] = useState(false);
    const [modalContentAdmin,setModalContentAdmin] = useState({content:{
            date: new Date(),
            startTime:'',
            maxParticipants:0,
            trainerId:0,
            workoutId:0,
        }});
    const [workoutList,setWorkoutList] = useState([]);
    const [trainerList,setTrainerList] = useState([]);
    const [isScheduleItem,setIsScheduleItem] = useState(false);


    useEffect( () =>{
        createDatesArray(page);
    },[page])

    useEffect(()=>{
        fetchSchedule();
    },[dates])

    useEffect(function (){
        isBooked();
    },[modalShow])

    useEffect(function (){
        formWorkoutOptionsList().then(data=>{
            setWorkoutList(data);
        });
        formTrainersOptionList().then(data=>{
            setTrainerList(data);
        })
    },[])

    async function isBooked(){
        if(modalContent.id && user.user.id){
            const data = await checkBooking(user.user.id,modalContent.id);
            setModalContent({...modalContent, booked: data.booked})
        }

    }
    async function fetchSchedule(){
        const data = await  getScheduleRange(dates[0],dates[dates.length-1]);
        const groupedScheduleByTime = groupSchedulesByTime(data);
        setSchedules(groupedScheduleByTime);
    }
    const groupSchedulesByTime = (schedules) => {
        const groupedSchedules = {};

        for (const schedule of schedules) {
            const startTime = schedule.startTime.split(':')[0];
            if (!groupedSchedules[startTime+":00"]) {
                groupedSchedules[startTime+":00"] = [];
            }
            groupedSchedules[startTime+":00"].push(schedule);
        }

        // Преобразование объекта в массив пар ключ-значение и сортировка по ключам
        const sortedGroupedSchedules = Object.entries(groupedSchedules).sort(([keyA], [keyB]) => {
            return keyA.localeCompare(keyB);
        });

        // Преобразование отсортированного массива обратно в объект
        const sortedSchedules = {};
        for (const [startTime, schedules] of sortedGroupedSchedules) {
            sortedSchedules[startTime] = schedules;
        }


        return sortedSchedules;
    };

    function createDatesArray (page){
        let currentPage;
        page? currentPage = page: currentPage = 0;
        const currentDate = new Date();
        const yesterday = new Date();
        yesterday.setDate(currentDate.getDate() - 1 + +currentPage*5);

        const datesArr = [yesterday];

        for (let i = 0+currentPage*5; i <= 5+currentPage*5; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            datesArr.push(date);
        }

        setDates(datesArr);
    }




    async function handleBookSchedule(userId, scheduleId) {
        setError('');
        try {
            await postBooking(userId, scheduleId);
            setModalShow(false);
            setShowToast(true);
        }catch (e) {
            setError(e.response.data.message);
            setModalShow(false);
            setShowToast(true);
        }

    }

    function handleClickArrow(direction){
        if(direction==='left' && page>0){
            setPage(page - 1)
            return;
        }
        if(page==0 && direction ==="left"){
            return;
        }
        setPage(page + 1);
    }

    async function createNewSchedule(schedule){
        const data = await postSchedule(schedule);
        setShowModalAdmin(false);
        fetchSchedule();
    }
    async function changeExistingSchedule(schedule,isDelete){
        if(!isDelete){
            const  data = await putSchedule(schedule);
        }else {
            const data = await deleteSchedule(schedule.id);
        }
        setShowModalAdmin(false);
        fetchSchedule();
    }
    function handleContextMenuClick(event,content,isScheduleItem){
        if(user.isAuth && user.user.role ==="ADMIN"){
            event.preventDefault();
            setMenuPosition({ x: event.clientX, y: event.clientY });
            setMenuContent(content);
            setIsScheduleItem(isScheduleItem)
            setShowContext(true);
        }
    }
    function handleMenuItemClick(operation,title,actionText,content){
        if(operation ==="create")
        {
            setModalContentAdmin({title,actionText,action:createNewSchedule,content:{
                    date: content.date? content.date.toISOString().slice(0, 10): "",
                    startTime: content.time? content.time: '',
                    maxParticipants:0,
                    trainerId:0,
                    workoutId:0,
                }});
        }
        if(operation ==="update"){
            setModalContentAdmin({title,actionText,action:changeExistingSchedule,content:content.schedule});
        }

        setShowModalAdmin(true);
    }

    const handleOutsideClick = () => {
        // Обработчик клика за пределами меню
        // ...
        setShowContext(false);
    };
    return (
        <div onClick={handleOutsideClick}>
            <div className="button-controllers">
                <button className="btn-arrow-left" onClick={()=>handleClickArrow("left")}><span></span> </button>
                <h2>Расписание занятий</h2>
                <button className="btn-arrow-right"onClick={()=>handleClickArrow("right")}> <span></span> </button>
            </div>

            <table className={"calendar"}>
                <thead>
                <tr>
                    <th>Время</th>
                    {dates.map((date, index) => {
                        const formattedDate = formatDate(date);
                        return <th
                            className={user.isAuth === true && user.user.role ==="ADMIN"? "calendar-cell-admin": ""}
                            onContextMenu={(e) =>handleContextMenuClick(e, {date},false)} key={index}>
                            {formattedDate.split(",")[1].toUpperCase()}<br/>{formattedDate.split(",")[0].toUpperCase()}
                        </th>;
                    })}
                </tr>
                </thead>
                <tbody>
                {Object.entries(schedules).map(([startTime, schedulesArr]) => (
                    <CalendarLine
                        className = "time-line"
                        key={startTime}
                        array={schedulesArr}
                        id={startTime}
                        dates={dates}
                        formatDate={formatDate}
                        setModalContent = {setModalContent}
                        setModalShow = {setModalShow}
                        handleContextMenuClick = {handleContextMenuClick}
                    />
                ))}
                </tbody>
            </table>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                       <div className="modal-title">
                           { modalContent && modalContent.workout ? modalContent.workout.name : ''}
                       </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-container">
                        <div className="info">
                            <div className="modal-description">Описание занятия: {
                                modalContent && modalContent.trainer
                                    ? modalContent.workout.description
                                    : ''}
                            </div>
                            <div className="modal-time"> {modalContent && modalContent.startTime
                                ?
                                modalContent.startTime.split(':')[0] + ':' + modalContent.startTime.split(':')[1] + ' '
                                :
                                ''}

                                Длительность {modalContent && modalContent.workout ? modalContent.workout.duration : ''} мин.
                            </div>
                        </div>
                        <div className="info">
                            <div className="modal-trainer">Тренер: {
                                modalContent && modalContent.trainer
                                    ? modalContent.trainer.firstName + " " + modalContent.trainer.lastName
                                    : ''}
                            </div>
                            <div
                                className="modal-trainer-specialization">Специализация: {modalContent && modalContent.trainer ? modalContent.trainer.specialization : ''}
                            </div>
                            <div
                                className="modal-trainer-description"> {modalContent && modalContent.trainer ? modalContent.trainer.description : ''}
                            </div>
                        </div>
                        <div className="modal-available-spots"> Доступно
                            {modalContent && modalContent.availableSpots ?" " + modalContent.availableSpots : '0'} из
                            {modalContent && modalContent.maxParticipants ? ' ' + modalContent.maxParticipants : ''} мест
                        </div>
                        <div className='modal-button-container'>
                            <button className="discard-btn" onClick={()=>setModalShow(false)}>Отмена</button>
                            {
                                !modalContent.booked
                                    ?
                                    <button onClick={()=> handleBookSchedule(user.user.id, modalContent.id)}>Забронировать</button>
                                    :
                                    <button className={'book-btn-disabled'} disabled>Забронировано</button>
                            }

                        </div>

                    </div>
                </Modal.Body>
            </Modal>


            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                    background: "white",
                    zIndex:20,
                    position: "fixed",
                    top: "54px",
                    right: "0px",
                }}
            >
                <Toast.Header>
                    <strong className="me-auto">
                        {
                            error!='' ? "Ошибка" : "Уведомление"
                        }
                    </strong>
                </Toast.Header>
                <Toast.Body>
                    {
                        error!='' ? error : "Занятие успешно забронировано"
                    }
                </Toast.Body>
            </Toast>

            <CustomContextMenu
                menuPosition={menuPosition}
                handleMenuItemClick={handleMenuItemClick}
                showContext = {showContext}
                isScheduleItem={isScheduleItem}
                menuContent = {menuContent}
            >

            </CustomContextMenu>

            {
                user.isAuth && user.user.role ==="ADMIN"&&
                <ScheduleModal
                    show = {showModalAdmin}
                    onHide={()=>setShowModalAdmin(false)}
                    modalContent = {modalContentAdmin}
                    setModalContent = {setModalContentAdmin}
                    workoutsList={workoutList}
                    trainersList={trainerList}
                    isScheduleItem = {isScheduleItem}
                />
            }

        </div>
    );
});

export default Calendar;
