import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom"
import AdminPage from "../pages/AdminPage";
import {ADMIN_ROUTE, BASKET_ROUTE, GOOD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth";
import Shop from "../pages/Shop";
import GoodPage from "../pages/GoodPage";
import {Context} from "../index";

const AppRouter = () => {
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

            {user.isAuth === true && <Route path={ADMIN_ROUTE} element={<AdminPage/>}/>}
            {user.isAuth === true && <Route path={BASKET_ROUTE} element={<Basket/>}/>}
            <Route path={LOGIN_ROUTE} element={<Auth/>}/>
            <Route path={REGISTRATION_ROUTE} element={<Auth/>}/>
            <Route path={SHOP_ROUTE} element={<Shop/>}/>
            <Route path={GOOD_ROUTE} element={<GoodPage/>}/>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default AppRouter;