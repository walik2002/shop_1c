import React, {useEffect, useState} from 'react';
import './css/AdminControl.css'
import AdminControlHeader from "./AdminControlHeader";
import AdminControlTable from "./AdminControlTable";
import {deleteUser, getAllUsers, postUser, putUser} from "../../http/userApi";
import {formatDateExtend} from "../../utils/formaters";
import UserModal from "./modals/UserModal";

const fields = ["Имя","Фамилия","Email","Номер телефона","Дата регистрации","Роль"];
const UserControl = () => {
    const [users,setUsers] = useState([]);
    const [filteredUsers,setFilteredUsers] = useState([]);
    const [searchWord,setSearchWord] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({content:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            role:'',
            registrationDate:''
        }});

    useEffect(function (){
        fetchUsers();
    },[])

    useEffect(function (){
        setFilteredUsers(users.filter(user => (user.firstName + " " + user.lastName).toLowerCase().includes(searchWord.toLowerCase())));
    },[searchWord])


    async function fetchUsers() {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
    }

    function handleClickOpenModal(title, actionText,action, content,isCreate){
        console.log(content);
        if(isCreate)
        {
            setModalContent({title,actionText,action,content:{
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    role:'',
                    registrationDate:''
                }});
        }
        else {
            setModalContent({title,actionText,action,content});
        }

        setShowModal(true);
    }

    async function createNewUser(user) {
        const data = await postUser(user);
        setShowModal(false);
        fetchUsers();
    }

    async function changeExitingUser(user,isDelete){

        if(!isDelete){
            console.log(user);
            const  data = await putUser(user);
        }else {
            const data = await deleteUser(user.id);
        }
        setShowModal(false);
        fetchUsers();
    }

    return (
        <>
            <div className={'admin-control'}>
                <AdminControlHeader
                    title={'Список пользователей'}
                    clickCreateButton = {()=>handleClickOpenModal("Новый пользователь", "Создать",createNewUser,modalContent.content,true)}
                    setSearchWord = {setSearchWord}
                    searchWord = {searchWord}
                />
                <AdminControlTable tableData={filteredUsers} fields={fields}>
                    <tbody>
                    {
                        filteredUsers.map((user) => {
                            return <tr key={user.id}>
                                {
                                    Object.entries(user).map(([key, value]) =>
                                        key !== "id" && key !== "createdAt" && key !== "updatedAt" ? (
                                            key === "registrationDate" ? (
                                                <td key={key}>{formatDateExtend(value)}</td>
                                            ) : (
                                                <td key={key}>{value}</td>
                                            )
                                        ) : null
                                    )
                                }
                                <td
                                    className={'td-control'}
                                    onClick={()=>handleClickOpenModal("Редактирование пользователя","Изменить",changeExitingUser,user)}>
                                    Управлять
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </AdminControlTable>

            </div>

            <UserModal
                show = {showModal}
                onHide={()=>setShowModal(false)}
                modalContent = {modalContent}
                setModalContent = {setModalContent}
            />


        </>
    );
};

export default UserControl;