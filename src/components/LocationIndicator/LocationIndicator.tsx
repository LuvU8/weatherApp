import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setCityName } from "../../store/locationSlice/locationSlice";
import { setLoading, setError } from "../../store/statusSlice/statusSlice";
import getCityNameFromBrowser from "../../api/cityApi";

const LocationIndicator = () => {
  const cityName = useSelector((state: RootState) => state.location.cityName);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCityName = async () => {
      dispatch(setLoading(true));
      try {
        const city = await getCityNameFromBrowser();
        dispatch(setCityName(city));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCityName();
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>{cityName}</h1>
      </div>
    </>
  );
};

export default LocationIndicator;