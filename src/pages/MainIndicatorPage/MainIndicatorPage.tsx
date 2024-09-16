import React, { useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { WeatherCurrentIndicator } from "../../components/WeatherCurrentIndicator";
import { setError, setLoading } from "../../store/statusSlice/statusSlice";
import { HourlyWeatherCarousel } from "../../components/HourlyWeatherCarousel";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchWeatherData } from "../../store/weatherIndicatorSlice/weatherIndicatorSlice";
import { fetchCityFromBrowser } from "../../store/locationSlice/locationSlice";

const MainIndicatorPage = () => {
  const locationData = useSelector((state: RootState) => state.location);
  const { loading, error, current, hourly } = useSelector((state: RootState) => state.weather);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCityName = async () => {
      dispatch(setLoading(true));
      try {
        dispatch(fetchCityFromBrowser());
      } catch (error: unknown) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!locationData.cityName) {
      fetchCityName();
    }
  }, [locationData.cityName, dispatch]);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      dispatch(setLoading(true));
      try {
        if (locationData.latitude && locationData.longitude) {
          await dispatch(fetchWeatherData({ latitude: locationData.latitude, longitude: locationData.longitude }));
        }
      } catch (error: unknown) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (locationData.cityName) {
      fetchWeatherInfo();
    }
  }, [locationData.cityName, locationData.latitude, locationData.longitude, dispatch]);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "d MMMM", { locale: ru });

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <div>
        Ошибка: {error}
        <button onClick={() => window.location.reload()}>Повторить попытку</button>
      </div>
    );
  }

  if (!current || !hourly) {
    return <div>Нет данных о погоде</div>;
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="bg-blue-600 w-4/5 w-full p-4 rounded-lg flex justify-center">
        <div className="flex flex-col justify-center items-center mr-6">
          <h1 className="text-white text-5xl w-full mb-2">Погода в {locationData.cityName || "неизвестном городе"}</h1>
          <h1 className="text-white text-1l w-full">Сегодня {formattedDate}</h1>
        </div>
        <WeatherCurrentIndicator temperature={current.temperature} maxTemperature={current.maxTemperature} minTemperature={current.minTemperature} />
      </div>
      <div className="bg-blue-600 w-4/5 w-full p-4 rounded-lg flex justify-center">
        <HourlyWeatherCarousel time={hourly.time} temperature={hourly.temperature} />
      </div>
    </div>
  );
};

export default MainIndicatorPage;
