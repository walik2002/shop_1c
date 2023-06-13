export const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return newDate.toLocaleDateString('ru-RU', options);
};

export const formatDateExtend = (date)=>{
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return newDate.toLocaleDateString('ru-RU',options);
}

export const formatDateTime = (date)=>{
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric',hour:'numeric',minute:"numeric" };
    return newDate.toLocaleDateString('ru-RU',options);
}
export const formatTime = (time)=>{
    const temp = time.split(":");
    return temp[0]+":" + temp[1];
}

export const capitalize = (s) =>
{
    return s && s[0].toUpperCase() + s.slice(1);
}