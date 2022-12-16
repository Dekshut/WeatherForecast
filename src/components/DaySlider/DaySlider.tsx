import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { DayCard } from '../DayCard/DayCard'
import './DaySlider.scss'

export const DaySlider = () => {
    const { dailyForecast } = useSelector((state: RootState) => state.weather)

    return (
        <div className='container'>
            <div className="day-slider-wrapper">
                <div className='day-slider'>

                    {dailyForecast.map((day, index) => (
                        <DayCard day={day} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
