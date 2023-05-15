import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userApi";
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer( () => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const click = async ()=>{
        try{
            let data;
            if(isLogin){
                data = await  login (email, password);
            }
            else {
                data = await  registration(email,password);
            }

            user.setUser(data);
            user.setIsAuth(true);

            navigate(SHOP_ROUTE);
        }
        catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className= "d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style = {{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control placeholder="Введите Email..."
                                  className="mt-3"
                                  value={email}
                                  onChange={e=> setEmail(e.target.value)}
                    />
                    <Form.Control placeholder="Введите пароль..."
                                  className="mt-3"
                                  value={password}
                                  onChange={e=> setPassword(e.target.value)}
                                  type="password"
                    />
                    <Container style={{padding: 0}} className="d-flex justify-content-between flex-row mt-3">
                        {isLogin
                            ?
                            <div className="d-flex">
                                Нет аккаунта? <NavLink  to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div className="d-flex">
                                Есть аккаунт? <NavLink  to="/login"> Войдите!</NavLink>
                            </div>
                        }

                        <Button
                            variant="outline-success"
                            onClick={click}
                        >
                            {
                                isLogin
                                    ? "Войти"
                                    : "Зарегистрироваться"
                            }

                        </Button>
                    </Container>

                </Form>
            </Card>

        </Container>
    );
});

export default Auth;