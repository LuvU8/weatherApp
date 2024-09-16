import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { roundValue } from "../../utils/numbers";

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
}

const HourlyWeatherCarousel: React.FC<HourlyWeatherData> = ({ time, temperature }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="w-full mx-auto">
      {time.map((time, index) => (
        <div key={index} className="bg-blue-500 text-white h-32 flex p-6 justify-center items-center">
          <h3 className="text-lg">{new Date(time).getHours()}:00</h3>
          <p>Temperature: {roundValue(temperature[index])}°</p>
        </div>
      ))}
    </Slider>
  );
};

export default HourlyWeatherCarousel;
