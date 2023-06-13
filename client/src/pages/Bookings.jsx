import React, { useContext, useEffect, useState } from 'react';
import '../css/Bookings.css';
import { Context } from "../index";
import { deleteBooking, getBookingsByUserId } from "../http/bookingAPI";
import BookingsItem from "../components/BookingsItem";
import { Tab, Tabs } from "react-bootstrap";

const Bookings = () => {
    const { user } = useContext(Context);
    const [bookings, setBookings] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);
    const [archivedBookings, setArchivedBookings] = useState([]);

    useEffect(() => {
        fetchBookings(user.user.id);
    }, []);

    async function fetchBookings(userId) {
        const data = await getBookingsByUserId(userId);
        setBookings(data);
    }

    useEffect(() => {
        // Фильтрация активных броней
        const active = bookings.filter(booking => new Date(booking.schedule.date) >= new Date());
        setActiveBookings(active);

        // Фильтрация прошедших броней
        const archived = bookings.filter(booking => new Date(booking.schedule.date) < new Date());
        setArchivedBookings(archived);
    }, [bookings]);

    function handleCancelBooking(bookingId) {
        deleteBooking(bookingId).then(() => {
            fetchBookings(user.user.id);
        });
    }

    return (
        <div className='booking-container'>
            <h2>Мои забронированные занятия</h2>

            <Tabs
                defaultActiveKey="bookings"
                id="controlled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="bookings" title="Активные брони">
                    <div className="bookings-inner">
                        {
                            activeBookings.length > 0 ?
                            activeBookings.map(booking => {
                                return <BookingsItem key={booking.id} booking={booking} handleCancelBooking={handleCancelBooking} archive={false}/>
                            }):
                                <h3>Нет активных броней</h3>
                        }
                    </div>
                </Tab>
                <Tab eventKey="archive" title="Архив">
                    <div className="bookings-inner">
                        {
                            archivedBookings.length > 0 ?
                            archivedBookings.map(booking => {
                                return <BookingsItem key={booking.id} booking={booking} handleCancelBooking={handleCancelBooking} archive={true} />
                            })
                                :
                                <h3>Нет броней в архиве</h3>
                        }
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Bookings;
