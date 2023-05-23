import axios from "axios";

const $host = axios.create({
    baseURL: process.env.BASE_1C_URL
})

const  $authHost = axios.create({
    baseURL: process.env.BASE_1C_URL
})
const authInterceptor = config => {
    config.headers.authorization = `Basic ${process.env.AUTH_1C}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}