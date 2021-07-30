import './WeatherWidget.scss';
import { useState, useEffect } from 'react';

import WeatherList from './WeatherList';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";
const IPINFO_API_KEY = "9cc4b449f59c2b";
const isCurrentCityOn = true;

function WeatherWidget() {

  const [cityList, setCityList] = useState([]);

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

  return (
    <div className="WeatherWidget">
      <div>Widget</div>
      <WeatherList cityList={cityList} />
    </div>
  );
}

export default WeatherWidget;

