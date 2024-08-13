import { fetchWeatherApi } from "openmeteo";

const getWeatherData = async (latitude: number, longitude: number) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_80m", "wind_direction_80m", "visibility"],
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  return responses;
};

export default getWeatherData;
