import React, { useState, useEffect } from "react";

const LocationIndicator = ({ cityName }: { cityName: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();

    return () => {};
  }, []);

  return <div>{loading ? <p>Loading...</p> : <h1>{cityName}</h1>}</div>;
};

export default LocationIndicator;
