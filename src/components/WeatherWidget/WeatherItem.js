import './WeatherItem.scss';
import { useState, useEffect } from 'react';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";

function WeatherItem({ cityId, selectedUnits }) {
  // const cityId = 546105;
  const [currentCityData, setCurrentCityData] = useState({});

  function getCityWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${selectedUnits}&appid=${OPENWEATHERMAP_API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error('error'));
      })
      .then(data => data.json())
      // .then(data => console.log(data))
      .then(data => setCurrentCityData({
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility,
        windDirection: data.wind.deg,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      }))
      .catch((err) => {
        console.error(err.message);
      });
  }

  function getTempUnit() {
    if(selectedUnits === "standard") {
      return <span>&#8490;</span>;
    }
    if(selectedUnits === "metric") {
      return (
        <span>&#8451;</span>
        );
    }
    return <span>&#8457;</span>;
  }

  function getSpeedUnit() {
    if(selectedUnits === "imperial") {
      return "mph";
    }
    return "m/s";
  }

  function toWindTextualDescription(deg) {
    if(deg === undefined) {
      return "NA";
    }
    const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    const indexOfCompassSector = (deg/22.5).toFixed(0);
    return compassSector[indexOfCompassSector];
  }

  useEffect(()=>{
    if(cityId !== undefined) {
      getCityWeather()
    }
  },[cityId, selectedUnits]);

  return (
    <div className="WeatherItem">
      <h3 className="WeatherItem__city-name">{currentCityData.name}, {currentCityData.country}</h3>

      <div className="WeatherItem__general">
        <img className="WeatherItem__icon" src={`http://openweathermap.org/img/wn/${currentCityData.icon}@2x.png`} alt="WeatherIcon"></img>
        <p className="WeatherItem__temperature">{currentCityData.temperature} {getTempUnit()}</p>
      </div>

        <p className="WeatherItem__description">
          Feels Like {currentCityData.feelsLike} {getTempUnit()}, {currentCityData.description}
        </p>

      <div className="WeatherItem__extended">
        <p className="WeatherItem__extended-info"> <span className="WeatherItem__extended-icon WeatherItem__extended-icon--wind-direction" style={{transform: `rotate(${180+currentCityData.windDirection}deg)`}}></span> {currentCityData.windSpeed} {getSpeedUnit()} {toWindTextualDescription(currentCityData.windDirection)}</p>
        <p className="WeatherItem__extended-info"><span className="WeatherItem__extended-icon WeatherItem__extended-icon--pressure"></span> {currentCityData.pressure}hPa</p>
        
        <p className="WeatherItem__extended-info">Humidity: {currentCityData.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherItem;