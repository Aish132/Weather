import React, { useState } from "react";

function WeatherCard() {
  const [city, setCity] = useState("London");

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <div className="weather-icon">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
          alt="Weather"
        />
      </div>

      <div className="temperature">16°C</div>
      <div className="city">{city}</div>

      <div className="details">
        <div>
          <p>90%</p>
          <p>Humidity</p>
        </div>
        <div>
          <p>3.58 km/h</p>
          <p>Wind</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
