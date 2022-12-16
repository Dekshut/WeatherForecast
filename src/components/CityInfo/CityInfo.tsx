import React from 'react'
import { useSelector } from 'react-redux'
import { getMonthName } from '../../helpers/getDate';
import { importAll } from '../../helpers/importAllImages';
import { getTimeDescr, hoursToString, minutesToString } from '../../helpers/timeFunctions';
import { RootState } from '../../redux/store'
import './CityInfo.scss'

const images: any = importAll(require.context('../../images/flags', false, /\.(png|jpe?g|svg)$/));

export const CityInfo = () => {
  const { city } = useSelector((state: RootState) => state.weather)
  const icon = city !== null ? city.country.toLowerCase() + '.svg' : ''
  const timezone = city !== null ? city.timezone : 0

  const currentTime = new Date();
  currentTime.setMilliseconds(currentTime.getMilliseconds() + timezone * 1000);

  return (
    <div className='container'>
      <div className="header__data-box">
        <div className="header__current-time">{
          `${hoursToString(currentTime.getUTCHours())}:
            ${minutesToString(currentTime.getUTCMinutes())} ${getTimeDescr(currentTime.getUTCHours(), currentTime.getUTCMinutes())}`
        }</div>

        <div className="header__city">
          <div className="header__city-name">
            {city !== null ? city.name + ', ' + city.country : ''}
            <img className="header__city-flag" src={images[icon]} alt="" />
          </div>
        </div>

        <div className="header__current-data">{currentTime.getUTCDate()} {getMonthName(currentTime.getUTCMonth())}</div>
      </div>
    </div>
  )
}