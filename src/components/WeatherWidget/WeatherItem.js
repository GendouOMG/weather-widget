import './WeatherItem.scss';
import { useState, useEffect } from 'react';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";

function WeatherItem({  }) {
  const cityId = 546105;
  const [currentCityData, setCurrentCityData] = useState({});

  function getCityWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`)
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

  useEffect(()=>{
    if(cityId !== undefined) {
      getCityWeather()
    }
  },[cityId]);

  return (
    <div className="WeatherItem">
      <p>City: {currentCityData.name}</p>
      <p>Country: {currentCityData.country}</p>
      <p>Temperature: {currentCityData.temperature} &#8451;</p>
      <p>Feels Like: {currentCityData.feelsLike} &#8451;</p>
      <p>Pressure: {currentCityData.pressure}</p>
      <p>Humidity: {currentCityData.humidity}</p>
      <p>Wind speed: {currentCityData.windSpeed}</p>
      <p>Description: {currentCityData.description}</p>
    </div>
  );
}

export default WeatherItem;