import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchGoods = async () => {
    const {data} = await $host.get('api/goods');
    console.log(data);
    return data;
}
export const fetchOneGoods = async (id) => {
    const {data} = await $host.get('api/goods/'+id);
    return data;
}
