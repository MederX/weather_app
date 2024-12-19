import React from 'react';
import { Card } from 'react-bootstrap';

const WeatherCard = ({ weather }) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{weather.city}, {weather.country}</Card.Title>
        <Card.Text>
          <strong>Temperature:</strong> {weather.temperature}°C
        </Card.Text>
        <Card.Text>
          <strong>Condition:</strong> {weather.condition}
        </Card.Text>
        <img src={weather.icon} alt="Weather icon" />
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
