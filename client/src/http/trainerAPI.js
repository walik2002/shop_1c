import {$authHost,$host} from "./index";
export const postTrainer = async (trainer) => {
    const {data} = await $authHost.post('api/trainer', {...trainer});
    return data;
}
export  const getTrainers = async () =>{
    const {data} = await $host.get("/api/trainer");
    return data;
}

export const deleteTrainer = async (trainerId) =>{
    const {data} = await $authHost.delete("/api/trainer/" + trainerId);
    return data;
}

export const putTrainer = async (trainer) => {
    const {data} = await $authHost.put('/api/trainer/'+trainer.id,{...trainer} )
    return data
}

export const getTrainerExtend = async (id,year,month) => {
    const {data} = await $authHost.post('api/trainer/extend/' + id, {year,month});
    return data;
}