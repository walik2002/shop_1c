import {$authHost} from "./index.js";

export const createOrder = async (order) => {

    const {data} = await  $authHost.post("/orders/new/",order);
    return data;
}