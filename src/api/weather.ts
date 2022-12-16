import { customAxios } from "./api";

const appid = '2ff7101797c23184370edad451537041'




export async function getHourlyData(geolocation: string) {
    return await customAxios.get(`forecast?${geolocation}&units=metric&appid=${appid}`).then(res => res)
}

export async function getDailyData(geolocation: string) {
    return await customAxios.get(`onecall?${geolocation}&exclude=current,minutely,hourly,alerts&units=metric&appid=${appid}`).then(res => res)
}
