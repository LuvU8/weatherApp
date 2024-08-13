import React from "react";
import { TemperatureIndicator } from "../../components/TemperatureIndicator";
import { LocationIndicator } from "../../components/LocationIndicator";

const MainIndicatorPage = () => {
  return (
    <>
      <div className="flex justify-center flex-col">
        <div className="bg-blue-600 w-4/5 md:w-[800px] p-4 rounded-lg flex justify-center">
          <h1 className="text-white text-5xl w-full">
            Погода в <LocationIndicator />
          </h1>
          <TemperatureIndicator />
        </div>
      </div>
    </>
  );
};

export default MainIndicatorPage;
