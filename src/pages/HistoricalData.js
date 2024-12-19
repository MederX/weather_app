// src/pages/HistoricalData.js
import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const HistoricalData = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [historicalData, setHistoricalData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city},${country}&dt=2023-12-01`
      );
      const data = await response.json();
      setHistoricalData(data.forecast.forecastday); // Historical data
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
      <h1>Historical Weather Data</h1>
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
          Get Historical Data
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

      {historicalData && (
        <div className="mt-3">
          {historicalData.map((day, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <Card.Title>{day.date}</Card.Title>
                <Card.Text>
                  Max Temp: {day.day.maxtemp_c}°C <br />
                  Min Temp: {day.day.mintemp_c}°C <br />
                  Condition: {day.day.condition.text}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
