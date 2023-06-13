import {$authHost,$host} from "./index";
export const postWorkout = async (workout) => {
    const {data} = await $authHost.post('api/workout', {...workout});
    return data;
}
export  const fetchWorkouts = async () =>{
    const {data} = await $authHost.get("/api/workout/");
    return data;
}

export const deleteWorkout = async (workoutId) =>{
    const {data} = await $authHost.delete("/api/workout/" + workoutId);
    return data;
}

export const putWorkout = async (workout) => {
    console.log(workout);
    const {data} = await $authHost.put('/api/workout/'+workout.id,{...workout} )
}

export const getWorkoutsExtend = async (year,month) =>{
    const {data} = await $authHost.post('/api/workout/extend',{year,month});
    return data;
}