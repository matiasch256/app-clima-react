import { useState } from "react";
import "./AppClima.css";
const urlBase = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "cee8f4b8484833c0bed41d55c30d4ddd";
const difKelvin = 273.15;
export const AppClima = () => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar clima de:", city);
    // Aquí llamarás a la API de OpenWeatherMap
  };

  return (
    <div className="container">
      <h1 className="title">Clima App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Ingresa una ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="weather-info">
        <p>Temperatura: °C</p>
        <p>Descripción: </p>
      </div>
    </div>
  );
};
