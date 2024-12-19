// src/pages/HomePage.js
import React, { useState } from 'react';
import { Container, ListGroup, Form, Button } from 'react-bootstrap';
import LocationSelector from '../components/LocationSelector';
import WeatherCard from '../components/WeatherCard';
import { fetchWeather } from '../services/weatherService';

const HomePage = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (city, country) => {
    setError('');
    try {
      const data = await fetchWeather(city, country);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSuggestion = (selectedCity, selectedCountry) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
    setSuggestions([]); // Clear suggestions after selection
    handleSearch(selectedCity, selectedCountry); // Automatically fetch weather
  };

  return (
    <Container className="mt-4">
      <h1>Weather App</h1>
      
      {/* Location Selector */}
      <Form>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              fetchSuggestions(e.target.value); // Fetch suggestions as user types
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-2" onClick={() => handleSearch(city, country)}>
          Get Weather
        </Button>
        
        {/* Display suggestions for cities */}
        {suggestions.length > 0 && (
          <ListGroup className="mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {suggestions.map((suggestion, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSelectSuggestion(suggestion.name, suggestion.country)}
              >
                {suggestion.name}, {suggestion.country}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form>

      {/* Error message */}
      {error && <p className="text-danger mt-3">{error}</p>}

      {/* Weather Card */}
      {weather && <WeatherCard weather={weather} />}
    </Container>
  );
};

export default HomePage;
