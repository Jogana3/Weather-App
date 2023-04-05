import React, { useEffect } from 'react'
import moment from 'moment';
import '../css/styles.css';

export default function Weather({weatherData}) {

  let [localTime, setLocalTime] = React.useState("");
  let [sunrise] = React.useState(new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN'))
  let [sunset] = React.useState(new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN'))

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    const current = new Date();
             
    const time = current.toLocaleTimeString("en-IN");

    setLocalTime(time)

    setInterval(function() {window.location.reload()}, 90000);
  }, [])

  return (
    <div className="main">
      <button class="ui icon black basic button btn-refresh" onClick={() => refreshPage()}><i aria-hidden="true" class="refresh icon"></i></button>
      <div className="top">
        <p className="header">{weatherData.name}</p>
        <p className="day flex-day">Day: {moment().format('dddd')}, {moment().format('LL')}</p>
      </div>
      <div className="flex flex-temp">
      <i className="wi wi-thermometer"></i>
      <p className="temp">{weatherData.main.temp} &deg;C</p>
      </div>
      <div className="flex desc-container">
        <p className="description">{weatherData.weather[0].main}</p>
        <i className={ localTime < sunset ? `wi wi-owm-day-${weatherData.weather[0].id}` : `wi wi-owm-night-${weatherData.weather[0].id}`}></i>
      </div>

      <div className="flex">
        <p className="hum">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex flex-sr-st">
        <div className="sunrise-container">
          <p className="sunrise">Sunrise: {sunrise}</p>
          <i className="wi wi-sunrise"></i>
        </div>
        <div className="sunset-container">
          <p className="sunset">Sunset: {sunset}</p>
          <i className="wi wi-sunset"></i>
        </div>
      </div>
    </div>
  )
}
