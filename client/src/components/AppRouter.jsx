import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom"
import AdminPage from "../pages/AdminPage";
import {
    ADMIN_ROUTE, BOOKING_CONTROL,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    SCHEDULE_CONTROL,
    SCHEDULE_ROUTE,
    STAT_CONTROL,
    TRAINER_CONTROL,
    USER_BOOKINGS,
    USER_CONTROL,
    WORKOUT_CONTROL,
} from "../utils/consts";
import Auth from "../pages/Auth";
import {Context} from "../index";
import MainPage from "../pages/MainPage";
import Schedule from "../pages/Schedule";
import Bookings from "../pages/Bookings";
import WorkoutControl from "./admin/WorkoutControl";
import ScheduleControl from "./admin/ScheduleControl";
import UserControl from "./admin/UserControl";
import StatControl from "./admin/StatControl";
import TrainerControl from "./admin/TrainerControl";
import BookingControl from "./admin/BookingControl";
import {observer} from "mobx-react-lite";

const AppRouter = observer( () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {/*{isAuth == true && authRoutes.map(({path,Component})=>{*/}
            {/*    <Route key = {path} path={path} element={<Component/>} exact/>*/}
            {/*})}*/}

            {/*{publicRoutes.map(({path,Component})=>{*/}
            {/*    <Route key = {path} path={path} element={<Component/>} exact/>*/}
            {/*})}*/}
            {console.log("Авторизован " + user.isAuth)}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={ADMIN_ROUTE} element={<AdminPage/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={WORKOUT_CONTROL} element={<WorkoutControl/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={SCHEDULE_CONTROL} element={<ScheduleControl/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={USER_CONTROL} element={<UserControl/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={STAT_CONTROL} element={<StatControl/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={TRAINER_CONTROL} element={<TrainerControl/>}/>}
            {user.isAuth === true && user.user.role ==="ADMIN" && <Route path={BOOKING_CONTROL} element={<BookingControl/>}/>}


            {user.isAuth === true && <Route path={USER_BOOKINGS} element={<Bookings/>}/>}
            <Route path={LOGIN_ROUTE} element={<Auth/>}/>
            <Route path={REGISTRATION_ROUTE} element={<Auth/>}/>
            <Route path={MAIN_ROUTE} element={<MainPage/>}/>
            <Route path={SCHEDULE_ROUTE} element={<Schedule/>}/>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
});

export default AppRouter;