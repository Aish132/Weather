import React, { useEffect, useState } from "react";

// List of cities for the dropdown
const CITIES = ["Kathmandu", "London", "New York", "Tokyo", "Delhi"];

export default function Home() {
  
  const [city, setCity] = useState(localStorage.getItem("city") || "Kathmandu");
  // State to hold the fetched weather data
  const [weather, setWeather] = useState(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);


  const API_KEY = "c76fc70db1164f99988172657251506"; 

  const fetchWeather = async (cityName) => {
    setLoading(true); 
    setError(null);   

    
    if (!API_KEY) {
      setError("API Key is missing or invalid. Please get one from weatherapi.com.");
      setLoading(false);
      return; 
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
      );
      const data = await res.json();

      if (!res.ok || data.error) {
        // Handle API errors (e.g., city not found, invalid key message from API server)
        const errorMessage = data.error ? data.error.message : `HTTP error! status: ${res.status}`;
        setError(errorMessage);
        setWeather(null); // Clear weather data on error
      } else {
        // Set weather data if fetch is successful
        setWeather({
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          location: data.location.name,
        });
      }
    } catch (err) {
      
      setError("Failed to fetch weather data. Please check your internet connection.");
      setWeather(null); 
      console.error("Network or parsing error:", err);
    } finally {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    fetchWeather(city);
  }, [city]); 

  
  const handleChange = (e) => {
    const selected = e.target.value;
    setCity(selected); // Update the city state
    localStorage.setItem("city", selected); 
  };

  return (
    
    <div className="weather-container">
      <h1>Weather App</h1>

      {/* Dropdown for city selection */}
      <div className="search select"> {/* Applying 'search select' class for styling */}
        <select onChange={handleChange} value={city}>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional rendering for loading, error, and weather data */}
      {loading && <p className="message">Loading weather...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Render weather data if available, not loading, and no error */}
      {weather && !loading && !error && (
        <>
          {/* Weather icon */}
          <img src={weather.icon} alt={weather.condition} className="icon" />

          {/* Temperature */}
          <h1>{weather.temp}°C</h1>

          {/* Location */}
          <h2>{weather.location}</h2>

          {/* Weather condition text */}
          <p>{weather.condition}</p>

          {/* Humidity and Wind details, grouped for flex styling */}
          <div className="details">
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>💨 Wind: {weather.wind} km/h</p>
          </div>
        </>
      )}
    </div>
  );
}
