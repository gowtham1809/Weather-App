import { useContext, useState } from 'react';
import {WeatherContext} from './WeatherProvider';
import moment from 'moment-timezone';

 export const HourForecast = ( ) => {
    const{more,showHr,handleHrShow,handleShow,ForecastData,handleMore}=useContext(WeatherContext);
    
    console.log(more+" "+showHr+" "+"hour")
  return (
    <div>
    {!more &&(
    <div className='forecast-css forecast'>
      <div className='container-more'>
      <button onClick={()=>{handleMore(); handleHrShow();}} className='more'>more</button> 
      
       
       </div>
       {ForecastData && <h1 className='more-h1'>3 Hour Forecasting</h1> }
        <div className="forecast-item-div">
          {ForecastData && (
            ForecastData.slice(0, 5).map((day, index) => (
              <div className="forecast-3h-item" key={index}>
                 <p> {new Date(day.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })}</p>
                <img
               src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
               alt="Weather Icon"
               className="weather-icon"
               />
                
                <p> {Math.round(day.main.temp - 273.15)}°C</p>
                <p> { Math.round(day.wind.speed*3.6)} Km/h</p>
              </div>
            ))
          ) }
          {/* <button onClick={()=>{handleMore(); handleHrShow();}} className='more'>more</button> */}
        </div>
        
    </div>
    )}
    {more && showHr &&(
    <div className='forecast-css forecast-full'>
      <div class="container">
        <><button className="less-button" onClick={()=>{handleMore();handleShow(); handleHrShow();}}>Less</button></>
      
      
      </div>
      {ForecastData && <h1 className='heading-forecast'>Hourly Forecast</h1>}
     
     
        <div className="forecast-item-full">
          {ForecastData && (
 
            ForecastData.map((day, index) => (
              <div className='forecast-items' key={index}>
                {/* <div className="extradata">

                  <p className="extradata-label">Date :</p>
                   <p className="extradata-value"> {moment(day.dt_txt).format('MMMM Do YYYY')}</p>
                  </div> */}
                  <div className="extradata">
                    <p className="extradata-label">Time :</p>
                  <p className="extradata-value"> {moment(day.dt_txt).format('dddd')},{moment(day.dt_txt).format('h A')}</p></div>
             
                 <div className="extradata">
                  <p className="extradata-label">Humidity :</p>
                  <p className="extradata-value">{day.main.humidity}%</p>
                </div>
                <div className="extradata">
                  <p className="extradata-label">Temperature :</p>
                <p className="extradata-value"> {Math.round(day.main.temp- 273.15)}°C</p>
                </div>
               
                        <div className="extradata">
                  <p className="extradata-label">Wind Speed :</p>
                  <p className="extradata-value">{ (day.wind.speed*3.6).toFixed(2)} Km/h</p>
                </div>
                 <div className="extradata">
                  <p className="extradata-label">Description :</p>
                  <p className="extradata-value">{day.weather[0].description}</p>
                </div>
                
              </div>
            ))
          ) }
        </div>       
   </div>        
    )}
    
    </div>
  )
}

