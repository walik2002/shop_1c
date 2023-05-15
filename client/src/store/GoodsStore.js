import {makeAutoObservable} from "mobx"
export default class GoodsStore {
    constructor() {
        this._goods = [];
        makeAutoObservable(this);
    }

    setGoods(goods){
        this._goods = goods;
    }


    get goods() {
        return this._goods;
    }
}