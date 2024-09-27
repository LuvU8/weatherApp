// types.ts
export interface CityResponse {
  cityName: string | null;
  latitude: number | null;
  longitude: number | null;
}

// getCityNameFromBrowser.ts
const API_KEY = "66af3335b66ea580081180yre350412";

const getCityNameFromBrowser = (): Promise<CityResponse> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const reverseResponse = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}&format=json`);
            const reverseData = await reverseResponse.json();

            // Проверка корректности ответа
            const city = reverseData.address?.city || reverseData.address?.town || "Unknown city";
            const cityData: CityResponse = {
              cityName: city,
              latitude: latitude,
              longitude: longitude,
            };
            resolve(cityData);
          } catch (error) {
            console.error("Error getting city information:", error);
            reject(new Error("Failed to fetch city information"));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(new Error("Geolocation error: " + error.message));
        },
      );
    } else {
      console.error("Geolocation is not supported in your browser");
      reject(new Error("Geolocation is not supported"));
    }
  });
};

export default getCityNameFromBrowser;
