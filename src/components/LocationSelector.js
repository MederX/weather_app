// src/components/LocationSelector.js
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const LocationSelector = ({ onSubmit, fetchSuggestions }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    fetchSuggestions(newCity); // Pass city to fetch suggestions
  };

  const handleSelectSuggestion = (selectedCity, selectedCountry) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
    setSuggestions([]);
    onSubmit(selectedCity, selectedCountry); // Fetch weather on selection
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleCityChange}
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

        <Button className="mt-2" onClick={() => onSubmit(city, country)}>
          Get Weather
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
    </div>
  );
};

export default LocationSelector;
