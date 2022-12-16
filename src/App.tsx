import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { CityInfo } from './components/CityInfo/CityInfo';
import { DayCard } from './components/DayCard/DayCard';
import { DaySlider } from './components/DaySlider/DaySlider';
import { Header } from './components/Header/Header';
import { SunInfo } from './components/SunInfo/SunInfo';
import { Timestamps } from './components/Timestamps/Timestamps';
import { getForecast } from './redux/slices/weatherSlice';
import { AppDispatch, RootState } from './redux/store';

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getForecast('q=odesa'))
  }, [])

  return (
    <div className="App">
      <Header />
      <CityInfo />

      <DaySlider />
      <SunInfo />
      <Timestamps />

      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;
