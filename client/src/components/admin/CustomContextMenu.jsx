import React from 'react';
import './css/ContextMenu.css'
const CustomContextMenu = ({menuPosition, handleMenuItemClick,showContext, isScheduleItem,menuContent}) => {
    return (
        showContext && <ul
            style={{ position: 'fixed', left: menuPosition.x, top: menuPosition.y }}
            className={"custom-context-menu"}
        >
            <li className={"custom-context-menu-item"}
                onClick={()=>handleMenuItemClick("create","Новое расписание","Создать",menuContent)}>
                Добавить новое расписание
            </li>
            {console.log(isScheduleItem)}
            {
                isScheduleItem
                    ?
                    <li className={"custom-context-menu-item"}
                        onClick={(()=>handleMenuItemClick("update","Редактировать расписание","Изменить",menuContent))}>Редактировать расписание
                    </li>:""
            }
        </ul>
    );
};

export default CustomContextMenu;