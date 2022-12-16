import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getForecast } from '../../redux/slices/weatherSlice';
import { AppDispatch } from '../../redux/store';
import './Header.scss';

const { Search } = Input

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>()

    const onSearch = (str: string) => {
        dispatch(getForecast(`q=${str}`))
    }

    const findMe = () => {
        function success(position: any) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            dispatch(getForecast(`lat=${lat}&lon=${lon}`))
        }

        function error() {
            toast.error('Allow your browser to use Geolocation!');
        }

        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser!');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        <div className='header-wrapper'>
            <div className="container">
                <div className='header'>
                    <div className='header-logo'>The Weather Forecast</div>

                    <div className='header-actions'>
                        <Button onClick={findMe}>
                            Find me!
                        </Button >
                        <Search placeholder="input city to search" onSearch={onSearch} />
                    </div>
                </div>
            </div>
        </div>
    )
}
