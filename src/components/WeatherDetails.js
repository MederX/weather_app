import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../services/weatherService';

const WeatherDetails = () => {
  const { country, city } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(country, city).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [country, city]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (!weather || weather.error) {
    return <p>Error: {weather?.error || "No weather data available"}</p>; // Show error state
  }

  return (
    <div>
      <h1>{weather.city}</h1>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
};

export default WeatherDetails;
