import Axios from "axios";
import { createContext,useState ,useEffect} from 'react';

import { Weather } from "./Weather";
import{Forecast} from "./Forecast";
import { HourForecast } from "./HourForecast";

import Search from "./Search";

const key = 'fb15dddf4719efb10bf35db5819a624f';
export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("salem");
  const [data, setData] = useState();
  const [ForecastData, setForecast] = useState(null);
  const [more, setMore] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [showHr, setShowHr] = useState(false);
  const [error, seterror] = useState(false);
  
 

  const fetchData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
      setData(response.data);

      const response2 = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`);
      setForecast(response2.data.list);
    } catch (err) {

      alert("Enter the correct city!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
        setCity(response.data.name);
        fetchData();
      });
    } catch (err) {

      alert(err);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const handleShow = () => {
    setShowFull(!more);
  };

  const handleHrShow = () => {
    setShowHr(!more);
  };

  const handleMore = () => {
    setMore(!more);
  };

  return (
    <WeatherContext.Provider value={{
      city, data, ForecastData, getCurrentLocation,
      handleEnter, showHr, setMore, showFull, setShowHr,
      handleHrShow, more, handleShow, setMore, handleMore, fetchData, setCity
    }}>
      {children}
      <Search />
      <div className="Main-div">
        <div className="block-1">
          <Weather />
        </div>
        <div className="block-2">
          <HourForecast />
          <Forecast />
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
