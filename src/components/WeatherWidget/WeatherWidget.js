import './WeatherWidget.scss';
import { useState, useEffect } from 'react';

import WeatherList from './WeatherList';
import WeatherSettings from './WeatherSettings';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";
const IPINFO_API_KEY = "9cc4b449f59c2b";
// const isCurrentCityOn = true;

function WeatherWidget() {
  const [isLocalWeatherOn, setIsLocalWeatherOn] = useState(true);
  const [selectedUnits, setSelectedUnits] = useState("metric");
  const [cityList, setCityList] = useState([{
    name: "Kolpino",
    country: "RU",
    id: 546105
  }]);

// eslint-disable-next-line
  function getUserLanguage() {
    const userLanguage = window.navigator ? (window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage) : "en-EN";
      if(userLanguage.toLowerCase().includes("pt_br")) {
        return "pt_br";
      }
      if(userLanguage.toLowerCase().includes("zh_cn")) {
        return "zh_cn";
      }
      if(userLanguage.toLowerCase().includes("zh_tw")) {
        return "zh_tw";
      }

      return userLanguage.slice(0,2).toLowerCase();
  }

  function getReverseGeolocation([latitude, longitude]) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error("No response from openweathermap.org!"));
      })
      .then(response => response.json())
      .then( data => {
        return {
          name: data.name,
          country: data.sys.country,
          id: data.id
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function removeCity(RemIndex) {
    setCityList(prev => {
      return prev.filter((_, index) => index !== RemIndex);
    })
  }

  return (
    <div className="WeatherWidget">
      <div>Widget</div>
      <WeatherList
        cityList={cityList}
        isLocalWeatherOn={isLocalWeatherOn}
        selectedUnits={selectedUnits}
        getReverseGeolocation={getReverseGeolocation}
      />
      <WeatherSettings
        cityList={cityList}
        removeCity={removeCity}
        setCityList={setCityList}
        isLocalWeatherOn={isLocalWeatherOn}
        setIsLocalWeatherOn={setIsLocalWeatherOn}
        selectedUnits={selectedUnits}
        setSelectedUnits={setSelectedUnits}
        getReverseGeolocation={getReverseGeolocation}
      />
    </div>
  );
}

export default WeatherWidget;

