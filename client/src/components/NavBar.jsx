import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate,NavLink} from "react-router-dom";

const NavBar = observer (() => {

    const {user}= useContext(Context);
    const navigate = useNavigate();

    const logOut = () =>{
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear();
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:"white"}} to = {SHOP_ROUTE}>Онлайн Магазин</NavLink>
                {user.isAuth ?
                    <Nav style={{color:"white"}} className="ml-auto">
                        <Button variant={"outline-light"} onClick={()=>navigate(BASKET_ROUTE)}>Корзина</Button>
                        <Button variant={"outline-light"}>Админ панель</Button>
                        <Button className="ml-2"  variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav style={{color:"white"}} className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;