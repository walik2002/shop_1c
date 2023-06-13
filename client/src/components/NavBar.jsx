import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {ADMIN_ROUTE, CONTACTS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SCHEDULE_ROUTE, USER_BOOKINGS} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate,NavLink} from "react-router-dom";
import './css/NavBar.css';

const NavBar = observer (() => {

    const {user}= useContext(Context);
    const navigate = useNavigate();

    const logOut = () =>{
        console.log({...user.user});
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear();
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Container>
                    <NavLink className="link" style={{color:"white"}} to = {MAIN_ROUTE}>Главная</NavLink>
                    <NavLink className="link" style={{color:"white"}} to = {SCHEDULE_ROUTE}>Расписание</NavLink>
                    <NavLink className="link" style={{color:"white"}} to = {CONTACTS_ROUTE}>Контакты</NavLink>
                </Container>

                {user.isAuth ?
                    <Nav style={{color:"white"}} className="ml-auto">
                        <NavDropdown title={user.user.firstName + " " + user.user.lastName} className="button"  variant={"outline-light"}>

                            {
                                user.user.role ==="ADMIN"
                                    ?<NavDropdown.Item onClick={()=>navigate(ADMIN_ROUTE)}>Админ панель</NavDropdown.Item>
                                    :''
                            }

                            <NavDropdown.Item onClick={()=>navigate(USER_BOOKINGS)}>Мои брони</NavDropdown.Item>
                            <NavDropdown.Item>Профиль</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => logOut()}>Выйти</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                    :
                    <Nav style={{color:"white"}} className="ml-auto">
                        <Button className="button"  variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;