import {$authHost,$host} from "./index";
import bookings from "../pages/Bookings";
export const postBooking = async (userId,scheduleId) => {
    const {data} = await $authHost.post('api/booking', {userId,scheduleId});
    return data;
}
export  const getBookingsByUserId = async (userId) =>{
    const {data} = await $authHost.get("/api/booking/user/" + userId);
    return data;
}

export const deleteBooking = async (bookingId) =>{
    const {data} = await $authHost.delete("/api/booking/" + bookingId);
    return data;
}

export const checkBooking = async (userId,scheduleId) =>{
    const {data} = await $authHost.post('/api/booking/check/',{userId,scheduleId});
    return data;
}

export const getBookings = async () =>{
    const {data} = await  $authHost.get('/api/booking');
    return data;
}

export const putBooking = async (booking) => {
    const {data} = await $authHost.put('/api/booking/'+booking.id ,{...booking})
    return data;
}