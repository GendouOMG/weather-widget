(this["webpackJsonpweather-widget-app"]=this["webpackJsonpweather-widget-app"]||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},,,,,function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(3),a=n.n(r),s=(n(16),n(17),n(2)),o=(n(18),n(19),n(20),n(1));var u=function(e){var t,n=e.cityId,i=e.selectedUnits,r=Object(c.useState)({}),a=Object(s.a)(r,2),u=a[0],d=a[1];function l(){return"standard"===i?Object(o.jsx)("span",{children:"\u212a"}):"metric"===i?Object(o.jsx)("span",{children:"\u2103"}):Object(o.jsx)("span",{children:"\u2109"})}return Object(c.useEffect)((function(){void 0!==n&&fetch("https://api.openweathermap.org/data/2.5/weather?id=".concat(n,"&units=").concat(i,"&appid=").concat("d79a6949b5e537387ac71885a0ebc698")).then((function(e){return e.ok?e:Promise.reject(Error("error"))})).then((function(e){return e.json()})).then((function(e){return d({name:e.name,country:e.sys.country,temperature:e.main.temp,feelsLike:e.main.feels_like,pressure:e.main.pressure,humidity:e.main.humidity,visibility:e.visibility,windDirection:e.wind.deg,windSpeed:e.wind.speed,description:e.weather[0].description,icon:e.weather[0].icon})})).catch((function(e){console.error(e.message)}))}),[n,i]),Object(o.jsxs)("div",{className:"WeatherItem",children:[Object(o.jsxs)("h3",{className:"WeatherItem__city-name",children:[u.name,", ",u.country]}),Object(o.jsxs)("div",{className:"WeatherItem__general",children:[Object(o.jsx)("img",{className:"WeatherItem__icon",src:"http://openweathermap.org/img/wn/".concat(u.icon,"@2x.png"),alt:"WeatherIcon"}),Object(o.jsxs)("p",{className:"WeatherItem__temperature",children:[u.temperature," ",l()]})]}),Object(o.jsxs)("p",{className:"WeatherItem__description",children:["Feels Like ",u.feelsLike," ",l(),", ",u.description]}),Object(o.jsxs)("div",{className:"WeatherItem__extended",children:[Object(o.jsxs)("p",{className:"WeatherItem__extended-info",children:[" ",Object(o.jsx)("span",{className:"WeatherItem__extended-icon WeatherItem__extended-icon--wind-direction",style:{transform:"rotate(".concat(180+u.windDirection,"deg)")}})," ",u.windSpeed," ","imperial"===i?"mph":"m/s"," ",(t=u.windDirection,void 0===t?"NA":["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"][(t/22.5).toFixed(0)])]}),Object(o.jsxs)("p",{className:"WeatherItem__extended-info",children:[Object(o.jsx)("span",{className:"WeatherItem__extended-icon WeatherItem__extended-icon--pressure"})," ",u.pressure,"hPa"]}),Object(o.jsxs)("p",{className:"WeatherItem__extended-info",children:["Humidity: ",u.humidity,"%"]})]})]})};var d=function(e){var t=e.cityList,n=e.isLocalWeatherOn,i=e.selectedUnits,r=e.getReverseGeolocation,a=e.isMenuOpen,d=Object(c.useState)(),l=Object(s.a)(d,2),h=l[0],j=l[1];function m(){navigator.geolocation?(console.log("Geodata Available"),function(){function e(){return new Promise((function(e,t){return navigator.geolocation.getCurrentPosition(e,t)}))}return e().then((function(e){return[e.coords.latitude.toFixed(4),e.coords.longitude.toFixed(4)]})).catch((function(e){return console.error(e.message),p()}))}().then((function(e){return r(e)})).then((function(e){return j(e.id)}))):(console.log("Geodata Not Available"),p().then((function(e){return r(e)})).then((function(e){return j(e.id)})))}function p(){return fetch("https://ipinfo.io/?token=".concat("9cc4b449f59c2b")).then((function(e){return e.ok?e:Promise.reject(Error("error"))})).then((function(e){return e.json()})).then((function(e){return e.loc.split(",")})).catch((function(e){console.error(e.message)}))}return Object(c.useEffect)((function(){n&&m()}),[]),Object(o.jsxs)("div",{className:"WeatherList",style:{display:a?"none":null},children:[n&&void 0!==h&&Object(o.jsx)(u,{cityId:h,selectedUnits:i}),t.map((function(e,t){return Object(o.jsx)(u,{cityId:e.id,selectedUnits:i},t)}))]})},l=n(11),h=(n(22),n(4)),j=(n(23),n(7));var m=function(e){var t=e.cityList,n=e.setCityList,c=e.removeCity;return Object(o.jsx)(j.a,{onDragEnd:function(e){if(e.destination&&e.destination.index!==e.source.index){var c=Array.from(t),i=c.splice(e.source.index,1),r=Object(s.a)(i,1)[0];c.splice(e.destination.index,0,r),n(c)}},children:Object(o.jsx)(j.c,{droppableId:"AddedCities",children:function(e){return Object(o.jsxs)("ul",Object(h.a)(Object(h.a)({className:"AddedCities"},e.droppableProps),{},{ref:e.innerRef,children:[t.map((function(e,t){return Object(o.jsx)(j.b,{draggableId:e.id.toString(),index:t,children:function(n){return Object(o.jsxs)("li",Object(h.a)(Object(h.a)(Object(h.a)({className:"AddedCities__single-city",ref:n.innerRef},n.draggableProps),n.dragHandleProps),{},{children:[Object(o.jsxs)("p",{className:"AddedCities__name",children:[e.name,", ",e.country]}),Object(o.jsx)("button",{className:"AddedCities__remove-btn",type:"button",onClick:function(){return c(t)}})]}))}},e.id)})),e.placeholder]}))}})})};var p=function(e){var t=e.cityList,n=e.setCityList,i=e.removeCity,r=e.isLocalWeatherOn,a=e.setIsLocalWeatherOn,u=e.selectedUnits,d=e.setSelectedUnits,h=e.getReverseGeolocation,j=Object(c.useState)(""),p=Object(s.a)(j,2),b=p[0],f=p[1],O=Object(c.useState)([]),g=Object(s.a)(O,2),_=g[0],x=g[1];function v(e){e.target.value!==u&&d(e.target.value)}var W=Object(c.useRef)();function y(e){W.current.contains(e.target)||x([])}return Object(c.useEffect)((function(){return document.addEventListener("mousedown",y),function(){return document.removeEventListener("mousedown",y)}}),[]),Object(o.jsxs)("div",{className:"WeatherSettings",children:[Object(o.jsx)("h3",{className:"WeatherSettings__headline",children:"Settings"}),Object(o.jsxs)("form",{className:"WeatherSettings__settings-form",onSubmit:function(e){return e.preventDefault(),fetch("http://api.openweathermap.org/geo/1.0/direct?q=".concat(b,"&limit=10&appid=").concat("d79a6949b5e537387ac71885a0ebc698")).then((function(e){return e.ok?e:Promise.reject(Error("error"))})).then((function(e){return e.json()})).then((function(e){return console.log(e),e})).then((function(e){return x(e)})).catch((function(e){console.log("City not found"),console.error(e.message)}))},children:[Object(o.jsxs)("label",{className:"WeatherSettings__local-weather",children:["Display local weather?",Object(o.jsx)("input",{className:"WeatherSettings__local-weather-input",type:"checkbox",checked:r,onChange:function(){a("boolean"!==typeof r||function(e){return!e})}})]}),Object(o.jsxs)("div",{className:"WeatherSettings__units-list",children:[Object(o.jsxs)("label",{className:"WeatherSettings__unit".concat("standard"===u?" WeatherSettings__unit--active":""),children:["standard",Object(o.jsx)("input",{className:"WeatherSettings__unit-input",name:"units",type:"radio",value:"standard",checked:"standard"===u,onChange:v})]}),Object(o.jsxs)("label",{className:"WeatherSettings__unit".concat("metric"===u?" WeatherSettings__unit--active":""),children:["metric",Object(o.jsx)("input",{className:"WeatherSettings__unit-input",name:"units",type:"radio",value:"metric",checked:"metric"===u,onChange:v})]}),Object(o.jsxs)("label",{className:"WeatherSettings__unit".concat("imperial"===u?" WeatherSettings__unit--active":""),children:["imperial",Object(o.jsx)("input",{className:"WeatherSettings__unit-input",name:"units",type:"radio",value:"imperial",checked:"imperial"===u,onChange:v})]})]}),Object(o.jsxs)("div",{className:"WeatherSettings__search-wrapper",ref:W,children:[Object(o.jsx)("label",{className:"WeatherSettings__search",children:Object(o.jsx)("input",{className:"WeatherSettings__search-input",type:"text",placeholder:"City",value:b,onChange:function(e){f(e.target.value)}})}),_.map((function(e,t){return Object(o.jsxs)("div",{className:"WeatherSettings__matching-city",onClick:function(){return t=e.lat,c=e.lon,h([t,c]).then((function(e){return n((function(t){return t.some((function(t){return t.id===e.id}))?t:[].concat(Object(l.a)(t),[e])}))})),x([]),void f("");var t,c},children:[Object(o.jsxs)("p",{className:"WeatherSettings__matching-city-name",children:[e.name,",",e.country]}),Object(o.jsxs)("p",{className:"WeatherSettings__matching-city-geo",children:["Geo [",e.lat,",",e.lon,"]"]})]},t)}))]})]}),Object(o.jsx)(m,{cityList:t,setCityList:n,removeCity:i})]})};var b=function(){var e=Object(c.useState)(!0),t=Object(s.a)(e,2),n=t[0],i=t[1],r=Object(c.useState)("metric"),a=Object(s.a)(r,2),u=a[0],l=a[1],h=Object(c.useState)(!1),j=Object(s.a)(h,2),m=j[0],b=j[1],f=Object(c.useState)([{name:"Kolpino",country:"RU",id:546105},{name:"Moscow",country:"RU",id:524901}]),O=Object(s.a)(f,2),g=O[0],_=O[1];function x(e){var t=Object(s.a)(e,2),n=t[0],c=t[1];return fetch("http://api.openweathermap.org/data/2.5/weather?lat=".concat(n,"&lon=").concat(c,"&appid=").concat("d79a6949b5e537387ac71885a0ebc698")).then((function(e){return e.ok?e:Promise.reject(Error("No response from openweathermap.org!"))})).then((function(e){return e.json()})).then((function(e){return{name:e.name,country:e.sys.country,id:e.id}})).catch((function(e){console.error(e.message)}))}return Object(o.jsxs)("div",{className:"WeatherWidget",children:[Object(o.jsx)("button",{className:"WeatherWidget__open-menu-btn",onClick:function(){b((function(e){return!e}))}}),Object(o.jsx)(d,{cityList:g,isLocalWeatherOn:n,selectedUnits:u,getReverseGeolocation:x,isMenuOpen:m,setIsMenuOpen:b}),m&&Object(o.jsx)(p,{cityList:g,setCityList:_,removeCity:function(e){_((function(t){return t.filter((function(t,n){return n!==e}))}))},isLocalWeatherOn:n,setIsLocalWeatherOn:i,selectedUnits:u,setSelectedUnits:l,getReverseGeolocation:x,isMenuOpen:m,setIsMenuOpen:b})]})};var f=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsx)(b,{})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,29)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),r(e),a(e)}))};a.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(f,{})}),document.getElementById("root")),O()}],[[28,1,2]]]);
//# sourceMappingURL=main.7851c6dd.chunk.js.map