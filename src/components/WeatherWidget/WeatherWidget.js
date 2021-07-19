import './WeatherWidget.scss';
import { useState } from 'react';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";

const cityList = [];

function WeatherWidget() {

  const [currentCity, setCurrentCity] = useState('');
  const [currentCityWeather, setCurrentGeolocation] = useState("");


  function getUserLanguage () {
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


  function getCurrentWeather () {
    if (!navigator.geolocation) {
      console.log("Geodata Not Available");
      getGeolocationByIp ()
        .then(
          // position => updateCurrentCity(position)
        );
    } else {
      console.log("Geodata Available");
      getGeolocationApi()
        .then(
          // position => updateCurrentCity(position)
        );
    }
  }


  function getWeatherByGeo(position = "0,0") {
    const [latitude, longitude] = [...position.split(",")];
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=53&lon=53&appid=d79a6949b5e537387ac71885a0ebc698&units=metric`).then(data => data.json()).then(data => console.log(data));
  }


  function getGeolocationApi () {
    function getPosition(){
      return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    }

    return getPosition()
      .then((position) => {
        const latitude = (position.coords.latitude).toFixed(4);
        const longitude = (position.coords.longitude).toFixed(4);
        return [latitude, longitude].join(",");
      })
      .catch((err) => {
        console.error(err.message);
        return getGeolocationByIp();
      });
  }


  function getGeolocationByIp () {
    return fetch(`https://ipinfo.io/?token=9cc4b449f59c2b`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error('error'));
      })
      .then(data => data.json())
      .then(position => {
        return position.loc;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  // function updateCurrentCity (position = '0,0') {

  //   const [latitude, longitude] = [...position.split(",")];

  //   fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       return Promise.reject(Error("No response from openweathermap.org!"));
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       const closestCity = data[0];
  //       if(closestCity.name === undefined){
  //         console.error("No information about your region"); //#add action for no region error!
  //       }
  //       const latitude = (closestCity.lat).toFixed(4);
  //       const longitude = (closestCity.lon).toFixed(4);

  //       setCurrentCity(closestCity.name);
  //       setCurrentGeolocation([latitude, longitude].join(","));
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
  // }

  // function getCityWeather(city) {

  //   fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHERMAP_API_KEY}`)
  // }

  function isTheSameCity (cityGeo, newCityGeo) {
    if(cityGeo === newCityGeo) {
      return true;
    }
    return false;
  }


  return (
    <div className="WeatherWidget">
      <button onClick={()=>getWeatherByGeo()}>Take</button>
      {/* <div>{currentCity} + {currentGeolocation}</div> */}
    </div>
  );
}

export default WeatherWidget;

