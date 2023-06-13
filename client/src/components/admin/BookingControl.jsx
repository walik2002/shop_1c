import React, {useEffect, useState} from 'react';
import AdminControlHeader from "./AdminControlHeader";
import {deleteBooking, getBookings, putBooking} from "../../http/bookingAPI";
import {formatDateExtend, formatDateTime, formatTime} from "../../utils/formaters";
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import BookingModal from "./modals/BookingModal";
import {BOOKING_STATUSES} from "../../utils/consts";

const fields = ["Статус брони","Дата бронирования","Пользователь","Занятие"];
const BookingControl = () => {
    const [bookings,setBookings] = useState([]);
    const [filteredBookings,setFilteredBookings] = useState([]);
    const [searchWord,setSearchWord] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({content:{
            status:'',
            schedule:{},
            user:{},
            createdAt:''
        }});

    const [status,setStatus] = useState('');

    useEffect(function (){
        fetchBookings();
    },[])

    useEffect(function (){
        setFilteredBookings(bookings.filter(booking => booking.schedule.workout.name.toLowerCase().includes(searchWord.toLowerCase())));
    },[searchWord])

    useEffect(function (){
        fetchBookings();
    },[status])

    async function fetchBookings() {
        const data = await getBookings();
        console.log(data);
        setBookings(data);
        if(status.length>0){
            filterBookings(data);
        }
        else {
            setFilteredBookings(data);
        }
    }

    function handleClickOpenModal(title, actionText,action, content,isCreate){
        if(isCreate)
        {
            setModalContent({title,actionText,action,content:{
                    status:'',
                    schedule:{},
                    user:{},
                    createdAt:''
                }});
        }
        else {
            setModalContent({title,actionText,action,content});
        }

        setShowModal(true);
    }

    async function changeExitingBooking(booking,isDelete){
        if(!isDelete){
            const  data = await putBooking(booking);
        }else {
            const data = await deleteBooking(booking.id);
        }
        setShowModal(false);
        fetchBookings();
    }

    function handleGetBookingWithStatus(status) {
        setStatus(status);
    }

    function filterBookings(data){
        const filteredBookings = data.filter(booking=> booking.status === status);
        setFilteredBookings(filteredBookings);
    }

    return (
        <>
            <div className={'admin-control'}>
                <AdminControlHeader
                    title={'Список броней'}
                    setSearchWord = {setSearchWord}
                    searchWord = {searchWord}
                    isNonCreateable = {true}
                />
                <div className={'admin-schedule-actions'}>
                    <DropdownButton variant={"secondary"} title={"Опции"} className={"mt-0"}>
                        <DropdownItem onClick={()=>handleGetBookingWithStatus(BOOKING_STATUSES.PENDING)}>
                            Получить брони ожидающие подтверждения
                        </DropdownItem>
                        <DropdownItem onClick={()=>handleGetBookingWithStatus(BOOKING_STATUSES.CONFIRMED)}>
                            Получить подтвержденные брони
                        </DropdownItem>
                        <DropdownItem onClick={()=>handleGetBookingWithStatus(BOOKING_STATUSES.CANCELED)}>
                            Получить отмененные
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setStatus('');git
                            fetchBookings()
                        }}>
                            Получить все записи броней
                        </DropdownItem>
                    </DropdownButton>

                </div>
                <table>
                    <thead>
                    { //bookings.length>0 && Object.keys(bookings[0]).map((key) =>!key.toLowerCase().includes("id") && key!= "updatedAt" &&<th key={key}>{capitalize(key)}</th>)}
                        fields.map(field=>{
                            return <th>{field}</th>
                        })
                    }
                    <th>
                        Действие
                    </th>
                    </thead>
                    <tbody>
                    {
                       filteredBookings.length>0 && filteredBookings.map((booking) => {
                            return <tr key={booking.id}>
                                {
                                   Object.entries(booking).map(([key, value]) => !key.toLowerCase().includes('id') && key != "updatedAt" &&
                                        <td key={key}>
                                            {
                                                key === "createdAt" ? formatDateTime(value):
                                                key === "user" ? value.firstName + " " + value.lastName :
                                                    key === "schedule" ? value.workout.name +" "+ formatDateExtend(value.date) +" " +formatTime (value.startTime): value
                                            }
                                        </td>)
                                }
                                <td
                                    className={'td-control'}
                                    onClick={()=>handleClickOpenModal("Бронь ","Подтвердить бронь",changeExitingBooking,booking)}>
                                    Управлять
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>


            </div>

            <BookingModal
                show = {showModal}
                onHide={()=>setShowModal(false)}
                modalContent = {modalContent}
                setModalContent = {setModalContent}
            />


        </>
    );
};

export default BookingControl;