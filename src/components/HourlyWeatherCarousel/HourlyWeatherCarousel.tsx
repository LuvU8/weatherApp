import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { roundValue } from "../../utils/numbers";
import { WEATHER_DESCRIPTIONS } from "../../shared/constants";

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
  weatherCode: number[];
}

const HourlyWeatherCarousel: React.FC<HourlyWeatherData> = ({ time, temperature, weatherCode }) => {
  const icons = weatherCode.map((code) => WEATHER_DESCRIPTIONS[code].icon);

  return (
    <>
      <div>
        <h2 className="text-2xl text-white mb-4">Hourly Weather</h2>
      </div>
      <hr></hr>
      <Swiper pagination={{ clickable: true }} spaceBetween={10} slidesPerView={8} className="w-full mx-auto">
        {time.map((time, index) => (
          <SwiperSlide
            key={index}
            className="h-32 flex flex-col items-center justify-center rounded-lg p-4 border border-white-500 bg-gray-500 bg-opacity-25 border-opacity-25"
          >
            <h3 className="text-lg font-semibold text-white">{time}</h3>
            {icons[index]}
            <p className="text-xl text-white">{roundValue(temperature[index])}°</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HourlyWeatherCarousel;
