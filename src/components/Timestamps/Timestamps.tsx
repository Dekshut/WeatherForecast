import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Timestamp } from './Timestamp'
import './Timestamps.scss'

export const Timestamps = () => {
    const { selectedDayTimestamps } = useSelector((state: RootState) => state.weather)

    return (
        <div className="container">
            <div className="content__items">
                {selectedDayTimestamps.map((item, index) => (
                    <Timestamp {...item} key={index}/>
                ))}
            </div>
        </div>
    )
}
