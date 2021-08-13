import './WeatherSettings.scss';
import { useEffect, useState, useRef } from 'react';

import AddedCities from './AddedCities';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";

function WeatherSettings({ cityList, setCityList, removeCity, isLocalWeatherOn, setIsLocalWeatherOn, selectedUnits, setSelectedUnits, getReverseGeolocation }) {

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
    // if(latitude === undefined || longitude === undefined) {     
    //   return;
    // }
    getReverseGeolocation([latitude, longitude])
      .then(city => setCityList(prev=> {
        if(prev.some(item => item.id === city.id)) {
          return prev;
        }
        return [...prev, city];
      }))
    setMatchingCities([]);
    setCityInputState("");
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

  ////Click outside SEARCH?! Close search list!
  const searchCityRef = useRef();

  function handleClickOutside(event) {
      if (!searchCityRef.current.contains(event.target)) {
        setMatchingCities([]);
      }
  };

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  ////END of "Click outside SEARCH?! Close search list!"

  return (
    <div className="WeatherSettings">
      <h3 className="WeatherSettings__headline">Settings</h3>
      <form className="WeatherSettings__settings-form" onSubmit={getMatchingCities}>
        <label className="WeatherSettings__local-weather">
          Display local weather?
          <input className="WeatherSettings__local-weather-input" type="checkbox" checked={isLocalWeatherOn} onChange={toggleLocalWeather}></input>
        </label>
        <div className="WeatherSettings__units-list">
          <label className={ `WeatherSettings__unit${ selectedUnits === "standard" ? " WeatherSettings__unit--active" : "" }` }>
            standard
            <input
              className="WeatherSettings__unit-input"
              name="units"
              type="radio"
              value="standard"
              checked={selectedUnits === "standard"}
              onChange={toggleSelectedUnits}
            >
            </input>
          </label>
          <label className={ `WeatherSettings__unit${ selectedUnits === "metric" ? " WeatherSettings__unit--active" : "" }` }>
            metric
            <input
              className="WeatherSettings__unit-input"
              name="units"
              type="radio"
              value="metric"
              checked={selectedUnits === "metric"}
              onChange={toggleSelectedUnits}
            >             
            </input>
          </label>
          <label className={ `WeatherSettings__unit${ selectedUnits === "imperial" ? " WeatherSettings__unit--active" : "" }` }>
            imperial
            <input
              className="WeatherSettings__unit-input"
              name="units"
              type="radio"
              value="imperial"
              checked={selectedUnits === "imperial"}
              onChange={toggleSelectedUnits}
            >               
            </input>
          </label>
        </div>

        <div  className="WeatherSettings__search-wrapper" ref={searchCityRef}>
          <label className="WeatherSettings__search">
            <input
              className="WeatherSettings__search-input"
              type="text"
              placeholder="City"
              value={cityInputState}
              onChange={changeCityInput}
            >
            </input>
          </label>

          {matchingCities.map((city, index) => {
            return (
              <div className="WeatherSettings__matching-city" key={index} onClick={() => addInCityList(city.lat, city.lon)}>
                <p className="WeatherSettings__matching-city-name">{city.name},{city.country}</p>
                <p className="WeatherSettings__matching-city-geo">Geo [{city.lat},{city.lon}]</p>
              </div>
            );
          })}
        </div>
      </form>
      
      <AddedCities cityList={cityList} setCityList={setCityList} removeCity={removeCity} />

    </div>
  );
}

export default WeatherSettings;