import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDailyData, getHourlyData } from "../../api/weather";
import { IDaily } from "../../interfaces/daily";
import { ICity } from "../../interfaces/general";
import { ITimestamps } from "../../interfaces/hourly";
import { toast } from 'react-toastify';

interface IWeatherSlice {
    city: ICity | null,
    timestamps: ITimestamps[],
    dailyForecast: IDaily[],
    selectedDayForecast: IDaily | null,
    selectedDay: Date | null,
    selectedDayTimestamps: ITimestamps[]
}

export const getForecast = createAsyncThunk(
    'app/getInitialData',
    async function (geolocation: string, { dispatch }) {
        const hourlyData = await getHourlyData(geolocation).then(res => res)

        if(hourlyData.status === 404){
            toast.error("This city does not exist");
            return;
        }

        const city = hourlyData.data.city;
        const coord = `lat=${city.coord.lat}&lon=${city.coord.lon}`;

        const dailyData = await getDailyData(coord).then(res => res)

        if (hourlyData.status === 200) {
            dispatch(setCity(city))
            dispatch(setTimeStamps(hourlyData.data.list))
        }

        if (dailyData.status === 200) {
            dispatch(setDailyForecast(dailyData.data.daily))
            dispatch(setSelectedDay(dailyData.data.daily[0].dt))
        }
    },
);

const initialState: IWeatherSlice = {
    city: null,
    timestamps: [],
    dailyForecast: [],
    selectedDayForecast: null,
    selectedDay: null,
    selectedDayTimestamps: []
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity(state, action) {
            state.city = action.payload
        },
        setTimeStamps(state, action) {
            state.timestamps = action.payload
        },
        setDailyForecast(state, action) {
            state.dailyForecast = action.payload
        },
        setSelectedDay(state, action) {
            state.selectedDay = action.payload;

            const timezone = state.city !== null ? state.city?.timezone : 0
            const selectedDay = new Date(action.payload * 1000 + timezone * 1000);

            state.selectedDayTimestamps =
                state.timestamps.filter(time => new Date(time.dt * 1000 + timezone * 1000).getUTCDay() === selectedDay.getUTCDay())

            state.selectedDayForecast = state.dailyForecast.find(item => item.dt === action.payload) ?? null
        }
    },
    extraReducers: {},
})

export const { setCity, setTimeStamps, setDailyForecast, setSelectedDay } = weatherSlice.actions;

export default weatherSlice.reducer;