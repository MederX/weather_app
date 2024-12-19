import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const UVIndex = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [uvIndex, setUvIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  // Fetch UV Index and weather data
  const handleFetch = async () => {
    setError('');  // Reset error before fetching
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city},${country}`
      );
      const data = await response.json();

      // Ensure the UV index is present in the response
      if (data.current && data.current.uv !== undefined) {
        setUvIndex(data.current.uv);
      } else {
        setUvIndex(null);
        setError('UV index data not available.');
      }
    } catch (error) {
      setError('Error fetching data.');
      setUvIndex(null);
      console.error(error);
    }
  };

  // Fetch city suggestions based on user input
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

  // Select city and country from suggestions
  const handleSelectSuggestion = (selectedCity, selectedCountry) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="container mt-3">
      <h1>UV Index</h1>
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
          Get UV Index
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

      {error && <p className="text-danger mt-3">{error}</p>}

      {uvIndex !== null && (
        <div className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title>UV Index</Card.Title>
              <Card.Text>
                Current UV Index: {uvIndex}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UVIndex;
