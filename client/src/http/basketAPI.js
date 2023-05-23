import {$authHost, $host} from "./index";

const API_URL = "http://localhost:3001";

async function getBasketGoods(userId) {
    try {
        const {data} = await $authHost.post("/api/basket",{userId:userId});
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Не удалось получить товары из корзины");
    }
}

async function addGoodToBasket(userId, goodId) {
    try {
        const {data} = await $authHost.post("/api/basket/add",{goodId , userId})
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Не удалось добавить товар в корзину");
    }
}

async function removeGoodFromBasket(userId, basketGoodId) {
    try {
        const {data} = await $authHost.post("/api/basket/delete",{goodId:basketGoodId , userId})
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Не удалось удалить товар из корзины");
    }
}

export { getBasketGoods, addGoodToBasket, removeGoodFromBasket };
