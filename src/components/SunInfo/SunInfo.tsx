import React from 'react'
import './SunInfo.scss'
import sunriseIcon from '../../images/sunrise.png'
import sunsetIcon from '../../images/sunset.png'
import { getMonthName } from '../../helpers/getDate'
import { hoursToString, minutesToString } from '../../helpers/timeFunctions'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

let sunrise = new Date(),
    sunset = new Date(),
    dateTime = new Date();

export const SunInfo = () => {
    const { selectedDayForecast, city} = useSelector((state: RootState) => state.weather)

    const timezone = city !== null ? city.timezone : 0

    if (selectedDayForecast !== null) {
        sunrise = new Date(selectedDayForecast.sunrise * 1000 + timezone * 1000);
        sunset = new Date(selectedDayForecast.sunset * 1000 + timezone * 1000);
        dateTime = new Date(selectedDayForecast.dt * 1000 + timezone * 1000);
    }

    return (
        <div className="container">
            <div className="content__sun">
                <div className="content__day">
                    {`${dateTime.getUTCDate()} ${getMonthName(dateTime.getUTCMonth())}`}
                </div>
                <div className="content__sun-info">
                    <img className="content__sun-img" src={sunriseIcon} alt="" />
                    <div className="content__sun-box">
                        <div className="content__sun-name">Sunrise</div>
                        <div className="content__sun-descr--sunrise">
                            {`${hoursToString(sunrise.getUTCHours())}:${minutesToString(sunrise.getUTCMinutes())} AM`}
                        </div>
                    </div>
                </div>
                <div className="content__sun-info">
                    <img className="content__sun-img" src={sunsetIcon} alt="" />
                    <div className="content__sun-box">
                        <div className="content__sun-name">Sunset</div>
                        <div className="content__sun-descr--sunset">
                            {`${hoursToString(sunset.getUTCHours())}:${minutesToString(sunset.getUTCMinutes())} PM`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
