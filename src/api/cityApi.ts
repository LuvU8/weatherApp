const API_KEY = "66af3335b66ea580081180yre350412";

const getCityNameFromBrowser = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = "56.0319973"//position.coords.latitude;
          const longitude = "92.7683397"//position.coords.longitude;

          try {
            const reverseResponse = await fetch(
              `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}&format=json`
            );
            const reverseData = await reverseResponse.json();
            const city = reverseData.address.city;
            console.log("City:", city);
            resolve(city);
          } catch (error) {
            console.error("Error getting city information:", error);
            reject(error);
          }
        },
        function (error) {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported in your browser");
      reject(new Error("Geolocation is not supported"));
    }
  });
};

export default getCityNameFromBrowser;
