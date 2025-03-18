import { useState } from "react";
import "./AppClima.css";
import { NavBar } from "./components/navbar/NavBar";
import solIcon from "./assets/icons8-verano-100.png";

export const AppClima = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const difKelvin = 273.15;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${city}&appid=${API_KEY}&lang=es`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            placeholder="Ingresa una ciudad..."
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Buscar</button>
        </form>

        <div className="weather-info">
          {weather ? (
            <>
              <h2>
                Ciudad: {weather.name}, País:
                {weather.sys.country === "AR"
                  ? "Argentina"
                  : weather.sys.country}
              </h2>
              <div className="weather-details">
                <p>
                  Temperatura: {Math.floor(weather.main.temp - difKelvin)}°C
                </p>
                <p>Humedad: {weather.main.humidity}%</p>
                <p>Visibilidad: {weather.visibility / 1000} KM</p>
                <p>
                  Velocidad del viento: {Math.floor(weather.wind.speed)} km/h
                </p>
                <p>
                  Velocidad del viento: {Math.floor(weather.wind.speed)} km/h
                </p>
                <p>Presion Atmosferica: {weather.main.pressure} KPa</p>
                <p>Clima: {weather.weather[0].description} </p>
              </div>

              <img
                className="weather-icon"
                src={
                  weather.weather[0].description === "cielo claro"
                    ? solIcon
                    : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                }
                alt=""
              />
            </>
          ) : (
            <p className="pInfo">Ingresa una ciudad y presiona buscar.</p>
          )}
        </div>
      </div>
    </>
  );
};
