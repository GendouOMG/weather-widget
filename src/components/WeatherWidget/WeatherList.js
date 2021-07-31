import './WeatherList.scss';
import { useState, useEffect } from 'react';
import WeatherItem from './WeatherItem';

const OPENWEATHERMAP_API_KEY = "d79a6949b5e537387ac71885a0ebc698";
const IPINFO_API_KEY = "9cc4b449f59c2b";

function WeatherList({ cityList, isLocalWeatherOn, selectedUnits, getReverseGeolocation }) {
  const [currentCityId, setCurrentCityId] = useState();

  function getCurrentCity() {
    if (!navigator.geolocation) {
      console.log("Geodata Not Available");
      getGeolocationByIp ()
        .then(
          position => getReverseGeolocation(position)
        )
        .then(
          city => setCurrentCityId(city.id)
        );
    } else {
      console.log("Geodata Available");
      getGeolocationApi()
        .then(
          position => getReverseGeolocation(position)
        )
        .then(
          city => setCurrentCityId(city.id)
        );
    }
  }

  function getGeolocationApi() {
    function getPosition(){
      return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    }

    return getPosition()
      .then((position) => {
        const latitude = (position.coords.latitude).toFixed(4);
        const longitude = (position.coords.longitude).toFixed(4);
        return [latitude, longitude];
      })
      .catch((err) => {
        console.error(err.message);
        return getGeolocationByIp();
      });
  }

  // Returns array [latitude, longitude]
  function getGeolocationByIp() {
    return fetch(`https://ipinfo.io/?token=${IPINFO_API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error('error'));
      })
      .then(data => data.json())
      .then(position => {
        return position.loc.split(',');
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function TestT() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&appid=d79a6949b5e537387ac71885a0ebc698`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(Error('error'));
      })
      .then(data => data.json())
      .then(data => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  useEffect(()=>{
    if(isLocalWeatherOn) {
      getCurrentCity();
    }
  },[]);

  return (
    <div className="WeatherList">
      Тут Список:
      {/* {cityList.length} */}
      <button onClick={TestT}>Get</button>
      {/* <button onClick={()=>0}>Take</button> */}
      
      {isLocalWeatherOn &&
        <WeatherItem cityId={currentCityId} selectedUnits={selectedUnits} />
      }

      {cityList.map((city, index) => <WeatherItem key={index} cityId={city.id} selectedUnits={selectedUnits} />)}
    </div>
  );
}

export default WeatherList;

