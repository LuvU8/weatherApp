import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setWeatherData } from "../../store/weatherIndicatorSlice/weatherIndicatorSlice";
import { setError } from "../../store/statusSlice/statusSlice";
import getWeatherData from "../../api/weatherApi";

const TemperatureIndicator: React.FC = () => {
  const { temperature, relativeHumidity } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const responses = await getWeatherData(latitude, longitude);

            const response = responses[0];
            const hourly = response.hourly();

            if (hourly) {
              const temperature2m = Number(hourly.variables(0)!.valuesArray()![0]);
              const relativeHumidity2m = Number(hourly.variables(1)!.valuesArray()![0]);

              dispatch(
                setWeatherData({
                  temperature: temperature2m,
                  relativeHumidity: relativeHumidity2m,
                }),
              );
            } else {
              dispatch(setError("Hourly data is null"));
            }
          },
          function (error) {
            console.error("Ошибка получения местоположения:", error);
          },
        );
      } else {
        console.error("Геолокация не поддерживается в вашем браузере");
      }
    };

    fetchData();
  }, [dispatch]);

  const roundedTemperature: number | null = temperature !== null ? Math.round(temperature) : null;

  return (
    <>
      <div className="inner-shadow bg-blue-500 p-4 rounded-lg w-80 h-80 flex items-center justify-center flex-col shadow-lg shadow-inner">
        <h1 className="text-white text-3xl">Температура: {roundedTemperature}°</h1>
        <div className="my-4"></div>
        <h1 className="text-white text-3xl">Влажность: {relativeHumidity}%</h1>
      </div>
    </>
  );
};

export default TemperatureIndicator;
