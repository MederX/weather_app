// src/pages/HourlyForecast.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const HourlyForecast = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city},${country}&days=1&hour=1`
      );
      const data = await response.json();
      setForecast(data.forecast.forecastday[0].hour); // Hourly data
    } catch (error) {
      console.error(error);
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

  const handleSelectSuggestion = (city, country) => {
    setCity(city);
    setCountry(country);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="container mt-3">
      <h1>Hourly Forecast</h1>
      <Form>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              fetchSuggestions(e.target.value); // Fetch suggestions as the user types
            }}
          />
        </Form.Group>
        <Button className="mt-2" onClick={handleFetch}>
          Get Hourly Forecast
        </Button>

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

      {forecast && (
        <div className="mt-3">
          {forecast.map((hour, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <Card.Title>{hour.time}</Card.Title>
                <Card.Text>
                  Temperature: {hour.temp_c}°C <br />
                  Condition: {hour.condition.text}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
