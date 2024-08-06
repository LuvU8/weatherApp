import React from "react";
import { TemperatureIndicator } from "../../components/TemperatureIndicator";
import { LocationIndicator } from "../../components/LocationIndicator";

const MainIndicatorPage = () => {
  return (
    <>
      <div className="flex justify-center flex-col">
        <h1 className="text-black text-5xl">Температура в</h1>
        <LocationIndicator />
        <div className="bg-blue-600 w-4/5 md:w-[800px] p-4 rounded-lg flex justify-center">
            <TemperatureIndicator />
        </div>
      </div>
    </>
  );
};

export default MainIndicatorPage;
