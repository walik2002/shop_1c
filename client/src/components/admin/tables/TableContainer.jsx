import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import {BOOKING_STATUSES, MONTHS} from "../../../utils/consts";
import '../css/StatTable.css'
import {formatDateExtend} from "../../../utils/formaters";
import {useReactToPrint} from "react-to-print";
import TableVisitStat from "./TableVisitStat";
import TableWorkoutStat from "./TableWorkoutStat";
import TableTrainerStat from "./TableTrainerStat";

const TableContainer = ({tableData, tableVariant}) => {

    const [month,setMonth] = useState();
    const [year,setYear] = useState(new Date().getFullYear());
    const [filteredData,setFilteredData] = useState([]);

    const tableRef = useRef(null);

    useEffect(function (){
       const filteredData = tableData.filter(item=> {
           return month && new Date(item.schedule.date).getMonth() === month.value
           && new Date(item.schedule.date).getFullYear() == year
           && item.status == BOOKING_STATUSES.CONFIRMED

       });
       setFilteredData(filteredData);
       console.log(filteredData);
    },[month,year])


    function handleSelectMonth(data){
        setMonth(data);
    }



    const generatePDF = useReactToPrint({
        content:()=> tableRef.current,
        documentTitle: "stat",
        onBeforeGetContent: ()=>{
            const tableContainer = tableRef.current
            const table = tableContainer.getElementsByTagName("table")[0];
            table.style.margin = "10px auto"
            const tdList = table.getElementsByTagName("td");
            const thList = table.getElementsByTagName("th");

            for (let i = 0; i < thList.length; i++) {
                const td = thList[i];
                td.style.border = "1px solid black";
                td.style.padding = "0px 5px"
                td.style.textAlign = "center"
            }

            // Применяем стили к каждой ячейке <td>
            for (let i = 0; i < tdList.length; i++) {
                const td = tdList[i];
                td.style.border = "1px solid black";
                td.style.padding = "0px 5px"
                td.style.textAlign = "center"
            }
        }
    });
    return (
        <div className={"stat-table"}>
            <div className={"stat-table-controls"}>
                <div className={'title'}>  за: </div>
                <Select
                    className={"select"}
                placeholder="Месяц...."
                isSearchable={true}
                options={MONTHS}
                value={month}
                onChange={handleSelectMonth}
                 />

                <Form.Control
                    style={{maxWidth:"120px"}}
                    type={"number"}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <Button style={{margin:"0 10px"}} onClick={generatePDF}>Сохранить PDF</Button>
            </div>
            <div>
                {
                    tableVariant &&
                        tableVariant == "visitStat" ? <TableVisitStat tableRef = {tableRef} year={year} month={month} data={filteredData}/> :
                        tableVariant == "workoutStat" ? <TableWorkoutStat tableRef = {tableRef} year={year} month={month} data={filteredData}/> :
                        tableVariant == "trainerStat" ? <TableTrainerStat tableRef = {tableRef} year={year} month = {month} data ={filteredData}/>: ''
                }
            </div>

        </div>
    );
};

export default TableContainer;