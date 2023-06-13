import React from 'react';
import {capitalize} from "../../utils/formaters";

const AdminControlTable = ({tableData,children,fields}) => {
    return (
        <table>
            <thead>
            <tr>
            {
                fields?
                    fields.map(field=>{
                        return <th>{field}</th>
                    })
                    :
                    tableData.length>0 && Object.keys(tableData[0]).map((key) =>!key.toLowerCase().includes("id") && key != "createdAt"&& key!= "updatedAt" &&<th key={key}>{capitalize(key)}</th>)}

                    <th>
                        Действие
                    </th>
                </tr>
            </thead>
            {
                children
            }
        </table>
    );
};

export default AdminControlTable;