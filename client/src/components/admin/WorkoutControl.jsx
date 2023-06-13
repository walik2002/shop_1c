import React, {useEffect, useState} from 'react';
import './css/AdminControl.css'
import {deleteWorkout, fetchWorkouts, postWorkout, putWorkout} from "../../http/workoutAPI";
import AdminControlHeader from "./AdminControlHeader";
import AdminControlTable from "./AdminControlTable";
import WorkoutModal from "./modals/WorkoutModal";

const PAGE_LIMIT = 2;
const fields = ["Название","Описание занятия", "Длительность, мин.", "Цена, руб"];
const WorkoutControl = () => {
    const [workouts,setWorkouts] = useState([]);
    const [filteredWorkouts,setFilteredWorkouts] = useState([]);
    const [workoutsToShow, setWorkoutsToShow] = useState([]);
    const [pages, setPages] = useState([]);
    const [activePage,setActivePage] = useState(1);
    const [searchWord,setSearchWord] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({content:{
            name:'',
            description:'',
            duration:0,
            price:''
        }});

    useEffect(function (){
        getWorkouts();
    },[])

    useEffect(function (){
        setFilteredWorkouts(workouts.filter(workout => workout.name.toLowerCase().includes(searchWord.toLowerCase())));
    },[searchWord])


    async function getWorkouts() {
        const data = await fetchWorkouts();
        console.log(data);
        setWorkouts(data);
        setFilteredWorkouts(data);
    }

    function handleClickOpenModal(title, actionText,action, content,isCreate){
        if(isCreate)
        {
            setModalContent({title,actionText,action,content:{
                    name:'',
                    description:'',
                    duration:0,
                    price:''
                }});
        }
        else {
            setModalContent({title,actionText,action,content});
        }

        setShowModal(true);
    }

    async function createNewWorkout(workout) {
        const data = await postWorkout(workout);
        setShowModal(false);
        getWorkouts();
    }

    async function changeExitingWorkout(workout,isDelete){

        if(!isDelete){
            console.log(workout);
            const  data = await putWorkout(workout);
        }else {
            const data = await deleteWorkout(workout.id);
        }
        setShowModal(false);
        getWorkouts();
    }

    return (
        <>
            <div className={'admin-control'}>
                <AdminControlHeader
                    title={'Список занятий'}
                    clickCreateButton = {()=>handleClickOpenModal("Новое занятие", "Создать",createNewWorkout,modalContent.content,true)}
                    setSearchWord = {setSearchWord}
                    searchWord = {searchWord}
                />
                <AdminControlTable tableData={filteredWorkouts} fields={fields}>
                    <tbody>
                    {
                        filteredWorkouts.map((workout) => {
                            return <tr key={workout.id}>
                                {
                                    Object.entries(workout).map(([key, value]) =>key!="id"&& key != "createdAt" && key != "updatedAt" &&
                                        <td key={key}>{value}</td>)
                                }
                                <td
                                    className={'td-control'}
                                    onClick={()=>handleClickOpenModal("Редактирование занятия","Изменить",changeExitingWorkout,workout)}>
                                    Управлять
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </AdminControlTable>

            </div>

            <WorkoutModal
                show = {showModal}
                onHide={()=>setShowModal(false)}
                modalContent = {modalContent}
                setModalContent = {setModalContent}
            />


        </>
    );
};

export default WorkoutControl;