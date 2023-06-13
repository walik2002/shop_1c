import React from 'react';
import Button from "react-bootstrap/Button";

const AdminControlHeader = ({title, clickCreateButton,setSearchWord,searchWord,isNonCreateable}) => {
    return (
        <div className={'admin-control-header'}>
            <h2>{title}</h2>
            <div className={'admin-control-header-controls'}>
                <input type="text" placeholder={"Поиск..."} onChange={(e)=>setSearchWord(e.target.value)} value={searchWord}/>
                {isNonCreateable?"":<Button variant={"success"} onClick={clickCreateButton}>Создать</Button>}
            </div>

        </div>
    );
};

export default AdminControlHeader;