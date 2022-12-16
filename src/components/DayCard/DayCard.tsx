import React, { useEffect, useState } from 'react';
import './DayCard.scss';
import { importAll } from '../../helpers/importAllImages';
import iconWind from '../../images/wind-b.png';
import iconHumidity from '../../images/humidity-b.png';
import { getDayName, getMonthName } from '../../helpers/getDate';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../../redux/slices/weatherSlice';
import { RootState } from '../../redux/store';

const images: any = importAll(require.context('../../images/weather', false, /\.(png|jpe?g|svg)$/));

export const DayCard = ({ day }: any) => {
    const dispatch = useDispatch();
    const { selectedDay, city } = useSelector((state: RootState) => state.weather)

    const timezone = city !== null ? city.timezone : 0
    const date = new Date(day.dt * 1000 + timezone * 1000);
    const icon = day.weather[0].icon + '.png'

    return (
        <div
            className={`days__item ${selectedDay === day.dt ? "days__item--checked" : ""}`}
            onClick={() => { dispatch(setSelectedDay(day.dt)) }}>
            <div className="days__item-imgbox">
                <img className="days__item-img" src={images[icon]} alt="" />
            </div>
            <div className="days__item-text">{getDayName(date.getUTCDay())}, {' '}
                {date.getUTCDate()} {getMonthName(date.getUTCMonth())}</div>
            <div className="days__item-temp">{Math.round(day.temp.day)}°</div>
            <div className="days__item-descr">{day.weather[0].description}</div>
            <div className="days__item-box">
                <div className="days__item-wind">
                    <img className="days__item-icon--wind" src={iconWind} />
                    Wind
                    <span>|</span>
                    <div className="days__item-data">{Math.round(day.wind_speed * 10) / 10} m/s</div>
                </div>
                <div className="days__item-hum">
                    <img className="days__item-icon--hum" src={iconHumidity} />
                    Hum
                    <span>|</span>
                    <div className="days__item-data">{Math.round(day.humidity)} %</div>
                </div>
            </div>
        </div>
    )
}
