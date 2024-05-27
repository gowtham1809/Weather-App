import React from 'react'
import { useContext,useEffect,useState } from 'react';
import {WeatherContext} from './WeatherProvider';
import moment from 'moment-timezone';


export const Weather = () => {
    const{data,}=useContext(WeatherContext);
    const [currentTime, setCurrentTime] = useState(moment().format('h:mm:ss A'));

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(moment().format('h:mm:ss A'));
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  return (
    <>
    {data &&(
      <div className="weather">
      
        <h1 className='city'>{data.name},{data.sys.country}</h1> 
          <h1 className='temperature'>{Math.round(data.main.temp-273.15)}&deg;C</h1>
          
          <p className="day-date">{currentTime}</p>
          <p className="day-date">{moment(data.dt_txt).format('dddd, MMMM Do YYYY')}</p>
          <p className='weather-i-t'>
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="Weather Icon" className="weather-icon"/>
           <span className="weather-text"> {data.weather[0].description}</span>
         </p>
         
         <div className="extradata">
          <span className="extradata-label">Humidity :</span>
          <span className="extradata-value">{data.main.humidity}%</span>
        </div>

        {/* <div className="extradata">
          <span className="extradata-label">Sunrise :</span>
          <span className="extradata-value">{moment(data.sys.sunrise * 1000).format('h:mm A')}</span>
        </div> */}
        <div className="extradata">
          <span className="extradata-label">Pressure :</span>
          <span className="extradata-value">{data.main.pressure} hPa</span>
        </div>
        <div className="extradata">
          <span className="extradata-label">Wind Speed :</span>
          <span className="extradata-value">{ (data.wind.speed*3.6).toFixed(2)} Km/h</span>
        </div>
        {/* <iframe src='https://www.wunderground.com/weather/maps/temperature/interactive/in/Bengaluru-North,Karnataka?zoom=3'></iframe> */}
       
      
    </div>)}
</>

  )
}

  
