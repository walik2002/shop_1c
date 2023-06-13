import React, {useContext} from 'react';
import {forEach} from "react-bootstrap/ElementChildren";
import CalendarItem from "./CalendarItem";
import {Context} from "../index";

const CalendarLine = ({ array, id, dates, formatDate,className,setModalContent,setModalShow,handleContextMenuClick }) => {
    const {user} = useContext(Context);
    return (
        <tr className={className}>
            <td>{id}</td>
            {dates.map((date, index) => {
                const formattedDate = formatDate(date);
                const schedules = array.filter((item) => {
                    const itemDate = new Date(item.date);
                    return formatDate(itemDate) === formattedDate;
                });

                if (schedules.length > 0) {
                    return (
                        <td
                            className={user.isAuth === true && user.user.role ==="ADMIN"? "calendar-cell-admin": ""}
                            onContextMenu={(e)=>handleContextMenuClick(e, {date,time:id})}
                            key={index}

                        >
                            {schedules.map((schedule, scheduleIndex) => (
                                <CalendarItem
                                    key={scheduleIndex}
                                    className= {"calendar-item"}
                                    scheduleData={schedule}
                                    setModalContent = {setModalContent}
                                    setModalShow = {setModalShow}
                                    handleContextMenuClick = {(e)=>{
                                        e.stopPropagation();
                                        handleContextMenuClick(e,{date,time:id,schedule},true)
                                    }}
                                />
                            ))}
                        </td>
                    );
                } else {
                    return <td
                        className={user.isAuth === true && user.user.role ==="ADMIN"? "calendar-cell-admin": ""}
                        onContextMenu={(e)=>handleContextMenuClick(e, {date,time:id})} key={index}>{/* Пустая ячейка */}</td>;
                }
            })}
        </tr>

    );
};



export default CalendarLine;