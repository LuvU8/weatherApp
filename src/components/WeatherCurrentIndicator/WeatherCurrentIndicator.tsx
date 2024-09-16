import React from "react";

interface CurrentWeatherProps {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
}

const WeatherCurrentIndicator: React.FC<CurrentWeatherProps> = ({ temperature, maxTemperature, minTemperature }) => {
  return (
    <div>
      <div className="inner-shadow bg-blue-500 p-4 mr-4 rounded-lg w-80 h-full flex items-center justify-center flex-col shadow-lg shadow-inner">
        <h1 className="text-white text-7xl">{temperature || "N/A"}</h1>
        <h1 className="text-white text-2xl">
          H: {maxTemperature || "N/A"} L: {minTemperature || "N/A"}
        </h1>
      </div>
    </div>
  );
};

export default WeatherCurrentIndicator;
