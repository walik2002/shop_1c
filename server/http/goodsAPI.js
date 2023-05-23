import {$authHost} from "./index.js";

export const fetchGoods = async ()=>{
    const {data} = await $authHost.get("/api/goods");
    return data;
}

export const fetchOneGood = async (goodId) => {
    const {data} = await  $authHost.get("/api//goods/" + goodId);
    return data;
}