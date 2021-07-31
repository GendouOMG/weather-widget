import './WeatherSettings.scss';
import { useState } from 'react';

import AddedCity from './AddedCity';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";

function WeatherSettings({ cityList, removeCity, setCityList, isLocalWeatherOn, setIsLocalWeatherOn, selectedUnits, setSelectedUnits, getReverseGeolocation }) {

  const [cityInputState, setCityInputState] = useState("");
  const [matchingCities, setMatchingCities] = useState([]);

  function toggleLocalWeather() {
    if(typeof isLocalWeatherOn === "boolean") {
      setIsLocalWeatherOn(prev => !prev);
    } else {
      setIsLocalWeatherOn(true);
    }
  }

  function addInCityList(latitude, longitude) {
    getReverseGeolocation([latitude, longitude])
      .then(city => setCityList(prev=> {
        if(prev.some(item => item.id === city.id)) {
          return prev;
        }
        return [...prev, city];
      }))
  }

  function toggleSelectedUnits(event) {
    if(event.target.value !== selectedUnits) {
      setSelectedUnits(event.target.value);
    }
  }

  function changeCityInput(event) {
    setCityInputState(event.target.value);
  }

  function getMatchingCities(event) {
    event.preventDefault();

    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInputState}&limit=10&appid=${OPENWEATHERMAP_API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(Error('error'));
    })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .then(data => setMatchingCities(data))
    .catch((err) => {
      console.log("City not found");
      console.error(err.message);
    });
  }

  return (
    <div className="WeatherSettings">
      <form>
        <label>
          Display local weather?
          <input type="checkbox" checked={isLocalWeatherOn} onChange={toggleLocalWeather}></input>
        </label>
        <div>
          <label>
            standard
            <input name="units" type="radio" value="standard" checked={selectedUnits === "standard"} onChange={toggleSelectedUnits}></input>
          </label>
          <label>
            metric
            <input name="units" type="radio" value="metric" checked={selectedUnits === "metric"} onChange={toggleSelectedUnits}></input>
          </label>
          <label>
            imperial
            <input name="units" type="radio" value="imperial" checked={selectedUnits === "imperial"} onChange={toggleSelectedUnits}></input>
          </label>
        </div>
      </form>

      {cityList.map( (city, index) => <AddedCity key={index} index={index} name={city.name} country={city.country} removeCity={removeCity} /> )}

      <form onSubmit={getMatchingCities}>
        <label>
          <input type="text" placeholder="City" value={cityInputState} onChange={changeCityInput}></input>
        </label>
      </form>

      {matchingCities.map((city, index)=> {
        return(
          <div key={index}>
            <p>{city.name},{city.country}</p>
            <p>Geo coords [{city.lat},{city.lon}]</p>
            <button onClick={()=> addInCityList(city.lat, city.lon)}>Add</button>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherSettings;