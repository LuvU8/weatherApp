import React from "react";
import { WEATHER_DESCRIPTIONS } from "../../shared/constants";

interface CurrentWeatherProps {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
  weatherCode: number;
}

const WeatherCurrentIndicator: React.FC<CurrentWeatherProps> = ({ temperature, maxTemperature, minTemperature, weatherCode }) => {
  const weatherDecription = WEATHER_DESCRIPTIONS[weatherCode] || "N/A";

  return (
    <div className="bg-gray-500 bg-opacity-25 p-4 rounded-lg w-2/4 h-full flex items-center justify-center flex-col">
      <h1 className="text-white text-7xl">{temperature || "N/A"}</h1>
      <h2 className="text-white text-2xl flex items-cente justify-centerr mt-2 mb-2">
        {weatherDecription.description} {weatherDecription.icon}
      </h2>
      <h1 className="text-white text-2xl">
        H: {maxTemperature || "N/A"} L: {minTemperature || "N/A"}
      </h1>
    </div>
  );
};

export default WeatherCurrentIndicator;
