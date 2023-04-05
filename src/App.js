/* eslint-disable eqeqeq */
import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  //const API_key = '635570c8872ff9feab4c89990ad028cf'

  const getWeather = async (lat, long) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=635570c8872ff9feab4c89990ad028cf`)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);}
    )
    
    if(lat != '' && long != '') {

    getWeather(lat, long);

    }


    }, [lat, long]);

    

  return (
    <div className="App flex-container">
      {data != '' ? (
        <Weather weatherData={data}>

        </Weather>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
      )}
    </div>
  );
}

export default App;
