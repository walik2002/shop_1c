
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ScheduleStore from "./store/ScheduleStore";


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            schedules: new ScheduleStore()
        }
    }>
        <App />
    </Context.Provider>

);