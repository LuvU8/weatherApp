import React from "react";
import { roundValue } from "../../utils/numbers";
import { WEATHER_DESCRIPTIONS } from "../../shared/constants";

interface DailyWeatherIndicatorProps {
  time: string[];
  maxTemperature: number[];
  minTemperature: number[];
  weatherCode: number[];
}

const DailyWeatherIndicator: React.FC<DailyWeatherIndicatorProps> = ({ time, maxTemperature, minTemperature, weatherCode }) => {
  const icons = weatherCode.map((code) => WEATHER_DESCRIPTIONS[code].icon);

  return (
    <div className="w-1/2 p-4 rounded-lg flex flex-col justify-start bg-gray-500 bg-opacity-25">
      <h2 className="text-2xl text-white mb-4">Daily Weather</h2>
      <ul className="w-full">
        {time.map((time, index) => (
          <li className="w-full flex justify-between items-center text-white text-2xl p-2 border-t border-white-500 border-opacity-25" key={index}>
            <span className="w-1/3">{time}</span>
            <span className="w-1/3">{icons[index]}</span>
            <div className="w-1/3 flex justify-between items-center">
              <span className="pr-4 w-1/5">{roundValue(minTemperature[index])}</span>
              <div className="w-3/5 h-2 bg-gradient-to-r from-blue-500 to-yellow-400 rounded"></div>
              <span className="pl-4 w-1/5">{roundValue(maxTemperature[index])}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyWeatherIndicator;
