import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email,password,firstName,lastName, phone) => {
    const {data} = await $host.post('api/user/registration', {email,password,role:"USER", firstName,lastName,phone});
    return jwt_decode(data.token);
}

export const login = async (email,password) => {
    const {data} = await $host.post('api/user/login', {email,password});
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token);
}

export const getAllUsers = async () => {
    const { data } = await $authHost.get("api/user/");
    return data;
};

export const getUserById = async (userId) => {
    const { data } = await $authHost.get(`api/user/${userId}`);
    return data;
};

export const postUser = async (user) => {
    const { data } = await $authHost.post("api/user/", user);
    return data;
};

export const putUser = async (user) => {
    const { data } = await $authHost.put(`api/user/${user.id}`, user);
    return data;
};

export const deleteUser = async (userId) => {
    const { data } = await $authHost.delete(`api/user/${userId}`);
    return data;
};