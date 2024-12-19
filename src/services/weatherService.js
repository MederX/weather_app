const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = async (city, country) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},${country}`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
  };
};
