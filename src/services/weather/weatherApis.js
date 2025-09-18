import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const AIR_API_BASE_URL = `http://api.openweathermap.org/data/2.5/air_pollution`;
const GEO_API_BASE_URL = `http://api.openweathermap.org/geo/1.0/reverse`;

export const getWeatherReq = async (lat, lng) => {
  const url = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&lang=kr&units=metric`;

  const response = await axios.get(url);
  return response.data;
};

export const getAirPollutionReq = async (lat, lng) => {
  const url = `${AIR_API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getReverseGeoApi = async (lat, lng) => {
  const url = `${GEO_API_BASE_URL}?lat=${lat}&lon=${lng}&limit=1&appid=${WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
