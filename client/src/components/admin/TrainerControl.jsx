import React, {useEffect, useState} from 'react';
import AdminControlHeader from "./AdminControlHeader";
import AdminControlTable from "./AdminControlTable";
import {deleteTrainer, getTrainers, postTrainer, putTrainer} from "../../http/trainerAPI";
import TrainerModal from "./modals/TrainerModal";

const fields = ["Имя","Фамилия","Описание","Специализация"]
const TrainerControl = () => {
    const [showModal,setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({content:{
        firstName:'',
        lastName:'',
        description:'',
        specialization:''
    }})
    const [trainers,setTrainers] = useState([]);
    const [filteredTrainers,setFilteredTrainers] = useState([]);
    const [searchWord,setSearchWord] = useState('');

    useEffect(function (){
        fetchTrainers();
    },[])


    useEffect(function (){
        filterTrainers();
    },[searchWord])

    function filterTrainers(){
        const filteredTrainers = trainers.filter(trainer => (trainer.firstName + " " +trainer.lastName).toLowerCase().includes(searchWord.toLowerCase()));
        setFilteredTrainers(filteredTrainers);
    }

    async function fetchTrainers(){
        const data = await getTrainers();
        setTrainers(data);
        setFilteredTrainers(data);
    }
    function handleClickOpenModal(title, actionText,action, content,isCreate){
        if(isCreate)
        {
            setModalContent({title,actionText,action,content:{
                    firstName:'',
                    lastName:'',
                    description:'',
                    specialization:''
                }});
        }
        else {
            setModalContent({title,actionText,action,content});
        }

        setShowModal(true);
    }

    async function createNewTrainer(trainer){
        const data = await postTrainer(trainer)
        setShowModal(false);
        fetchTrainers();
    }

    async function changeExistingTrainer(trainer,isDelete){
        if(!isDelete){
            console.log(trainer);
            const  data = await putTrainer(trainer);
        }else {
            const data = await deleteTrainer(trainer.id);
        }
        setShowModal(false);
        fetchTrainers();
    }

    return (
        <>
            <div className={'admin-control'}>
                <AdminControlHeader
                    title={'Список тренеров'}
                    clickCreateButton = {()=>handleClickOpenModal("Новый тренер", "Создать",createNewTrainer,modalContent.content,true)}
                    setSearchWord = {setSearchWord}
                    searchWord = {searchWord}
                />
                <AdminControlTable tableData={filteredTrainers} fields={fields}>
                    <tbody>
                    {
                        filteredTrainers.map((trainer) => {
                            return <tr key={trainer.id}>
                                {
                                    Object.entries(trainer).map(([key, value]) =>key!="id"&& key != "createdAt" && key != "updatedAt" &&
                                        <td key={key}>{value}</td>)
                                }
                                <td
                                    className={'td-control'}
                                    onClick={()=>handleClickOpenModal("Редактирование тренера","Изменить",changeExistingTrainer,trainer)}>
                                    Управлять
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </AdminControlTable>

            </div>

            <TrainerModal
                show = {showModal}
                onHide={()=>setShowModal(false)}
                modalContent = {modalContent}
                setModalContent = {setModalContent}
            />


        </>
    );
};

export default TrainerControl;