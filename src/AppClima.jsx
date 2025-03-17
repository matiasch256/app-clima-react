import { useState } from "react";
import "./AppClima.css";

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
    <div className="container">
      <h1 className="title">Clima App</h1>
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
              {weather.sys.country === "AR" ? "Argentina" : weather.sys.country}
            </h2>
            <p>Temperatura: {Math.floor(weather.main.temp - difKelvin)}°C</p>
            <p>
              Condición meteorologica actual: {weather.weather[0].description}{" "}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </>
        ) : (
          <p>Ingresa una ciudad y presiona buscar.</p>
        )}
      </div>
    </div>
  );
};
