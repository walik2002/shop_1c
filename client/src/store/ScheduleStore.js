import {makeAutoObservable} from "mobx"
export default class ScheduleStore {
    constructor() {
        this._schedules = [];
        makeAutoObservable(this);
    }

    setSchedules(schedules){
        this._schedules = schedules;
    }


    get schedules() {
        return this._schedules;
    }
}