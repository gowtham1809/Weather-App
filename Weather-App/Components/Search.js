
import React, { useContext } from 'react';
import { WeatherContext } from './WeatherProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Search() {
  const { city,setMore,setCity,fetchData,getCurrentLocation } = useContext(WeatherContext);
 
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
     
    }
   
  };
  const handle=()=>{
    setMore(false)
        }
  return (
    
      <>
      <div className='.search-bar'>
        <input
          type="text"
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter the city name"
          onKeyPress={handleKeyPress}
          />
           <FontAwesomeIcon icon={faSearch} className="search-icon" />
           <button className="fetch" onClick={()=>{fetchData();handle()}}>Fetch</button>
        <button className="location"onClick={getCurrentLocation}>Find Me</button>
      
          </div>
         
        
        
       
      </>
     
    
  );
}

export default Search;
