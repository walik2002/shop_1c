import {$authHost} from "./index";

export const createOrder = async (userId, order) => {
    console.log(order);
    const {data} = await $authHost.post('api/orders',{userId,order});
    return data;
}
