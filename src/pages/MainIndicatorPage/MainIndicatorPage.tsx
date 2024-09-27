import React, { useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { WeatherCurrentIndicator } from "../../components/WeatherCurrentIndicator";
import { HourlyWeatherCarousel } from "../../components/HourlyWeatherCarousel";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchWeatherData } from "../../store/weatherIndicatorSlice/weatherIndicatorSlice";
import { fetchCityFromBrowser } from "../../store/locationSlice/locationSlice";
import { DailyWeatherIndicator } from "../../components/DailyWeatherIndicator";
import { Skeleton } from "../../components/Skeleton";

const MainIndicatorPage = () => {
  const locationData = useSelector((state: RootState) => state.location);
  const { loading, error, current, hourly, daily } = useSelector((state: RootState) => state.weather);
  const dispatch = useAppDispatch();
  const backgroundClass = current?.isDay ? "bg-gradient-to-r from-blue-500 to-yellow-200" : "bg-gradient-to-r from-gray-900 to-black";

  useEffect(() => {
    const fetchCityName = async () => {
      dispatch(fetchCityFromBrowser());
    };

    if (!locationData.cityName) {
      fetchCityName();
    }
  }, [locationData.cityName, dispatch]);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      if (locationData.latitude && locationData.longitude) {
        await dispatch(fetchWeatherData({ latitude: locationData.latitude, longitude: locationData.longitude }));
      }
    };

    if (locationData.cityName) {
      fetchWeatherInfo();
    }
  }, [locationData.cityName, locationData.latitude, locationData.longitude, dispatch]);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "d MMMM", { locale: ru });

  if (loading) {
    return (
      <div className={`h-full ${backgroundClass}`}>
        <div className="flex justify-center flex-col items-center">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full ${backgroundClass}`}>
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-red-600">Произошла ошибка: {error.message}</h1>
        </div>
      </div>
    );
  }

  if (!current || !hourly || !daily) {
    return (
      <div className={`h-full ${backgroundClass}`}>
        <div className="flex justify-center flex-col items-center">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${backgroundClass}`}>
      <div className="flex justify-center flex-col items-center">
        <div className="w-4/5 pb-4 pt-4 rounded-lg flex justify-between">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white text-5xl w-full mb-2">Weather in {locationData.cityName || "неизвестном городе"}</h1>
            <h1 className="text-white text-1l w-full">Сегодня {formattedDate}</h1>
          </div>
          <WeatherCurrentIndicator
            temperature={current.temperature}
            maxTemperature={current.maxTemperature}
            minTemperature={current.minTemperature}
            weatherCode={current.weatherCode}
          />
        </div>
        <div className="w-4/5 p-4 rounded-lg flex justify-center bg-gray-500 bg-opacity-25">
          <HourlyWeatherCarousel time={hourly.time} temperature={hourly.temperature} weatherCode={hourly.weatherCode} />
        </div>
        <div className="w-4/5 mt-4 mb-10">
          <DailyWeatherIndicator
            time={daily!.time}
            maxTemperature={daily.maxTemperature}
            minTemperature={daily.minTemperature}
            weatherCode={daily!.weatherCode}
          />
        </div>
      </div>
    </div>
  );
};

export default MainIndicatorPage;
