import React from 'react'
import { getWindDirection } from '../../helpers/getWindDirection'
import { importAll } from '../../helpers/importAllImages';
import { hoursToString } from '../../helpers/timeFunctions'
import { ITimestamps } from '../../interfaces/hourly'
import iconDirect from '../../images/direction.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const images: any = importAll(require.context('../../images/weather', false, /\.(png|jpe?g|svg)$/));

export const Timestamp = (timestamp: ITimestamps) => {
    const { city } = useSelector((state: RootState) => state.weather)

    const time = new Date(timestamp.dt * 1000 + (city !== null ? city.timezone : 0) * 1000);
    const icon = timestamp.weather[0].icon + '.png'

    return (
        <div className={`content__item ${timestamp.sys.pod === 'n' ? 'content__item--night' : ''}`}>
            <div className="content__item-time">{hoursToString(time.getUTCHours()) + ':00'}</div>
            <img className="content__item-img" src={images[icon]}></img>
            <div className="content__item-temp">{Math.round(timestamp.main.temp)}°</div>
            <div className="content__item-descr">{timestamp.weather[0].description}</div>
            <div className='content__item-box'>
                <img
                    className="content__item-direction"
                    src={iconDirect}
                    style={{ transform: `rotate(${timestamp.wind.deg}deg)` }}
                />
                <div className="content__item-wind">{getWindDirection(timestamp.wind.deg)},
                    {Math.round(timestamp.wind.speed * 10) / 10} m/s</div>
                <div className="content__item-hum">{Math.round(timestamp.main.humidity)}%</div>
                <div className="content__item-pressure">{Math.round(timestamp.main.pressure)}hPa</div>
            </div >
        </div>
    )
}
