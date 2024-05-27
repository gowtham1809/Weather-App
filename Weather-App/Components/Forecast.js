
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { WeatherContext } from './WeatherProvider';  

const Forecast = () => {
  const { more,showFull,ForecastData } = useContext(WeatherContext); 
  const [currentDay, setCurrentDay] = useState(null);

  
  const groupForecastByDay = (data) => {
    const groupedData = {};
    data.forEach(item => {  
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  useEffect(() => {
    if (ForecastData) {
      console.log('Forecast data received:', ForecastData); 
      const forecastByDay = groupForecastByDay(ForecastData);
      const today = moment().format('YYYY-MM-DD');
      setCurrentDay(forecastByDay[today] ? today : Object.keys(forecastByDay)[0]);
    }
  }, [ForecastData]);

  const forecastDataByDay = ForecastData ? groupForecastByDay(ForecastData) : null;
  let currentDayData = currentDay ? forecastDataByDay[currentDay] : null;

  
  if (currentDayData && currentDayData.length < 5) {
    const nextDaysData = [];
    let nextDayIndex = 1;
    while (currentDayData.length + nextDaysData.length < 5) {
      const nextDayKey = Object.keys(forecastDataByDay)[nextDayIndex];
      if (nextDayKey) {
        nextDaysData.push(...forecastDataByDay[nextDayKey]);
        nextDayIndex += 1;
      } else {
        break;
      }
    }
    currentDayData = currentDayData.concat(nextDaysData.slice(0, 5 - currentDayData.length));
  }
  console.log(more+" "+showFull+" "+"fffffffff")
  return (

    <>
      {!more && (
    <div className=' forecast-css '>
        <h1 className='heading-forecast'>Five day Forecast </h1> 
        
        <div className="forecast-item-div" >
         
        {forecastDataByDay && Object.entries(forecastDataByDay).slice(0, 5).map(([dayKey, dayData], index) => (
          <div key={index} className="forecast-5d-item">
            <p>{moment(dayKey).format('dddd')}</p>
            <img
              src={`http://openweathermap.org/img/wn/${dayData[0].weather[0].icon}@2x.png`}
              alt={dayData[0].weather[0].description} className="weather-icon"
            />
            <p>High: {Math.round(Math.max(...dayData.map(item => item.main.temp_max - 273.15)))}&deg;C</p>
            <p>Low: {Math.round(Math.min(...dayData.map(item => item.main.temp_min - 273.15)))}&deg;C</p>
            
          </div>
        ))}
         {/* <button  onClick={()=>{handleMore(); handleShow();}}className='more'>more</button> */}
        </div>
      </div>

)}

    
      </>
   
   
  );
};

export default Forecast;


export {Forecast};
