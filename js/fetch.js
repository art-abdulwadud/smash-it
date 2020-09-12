const locationInput = document.querySelector("#location-input");
const errorDiv = document.querySelector(".error");
const loader = document.querySelector(".loading");

const convertTemp = (temp) => {
  return Math.floor(temp - 273.15);
};

const fetchWeather = async () => {
  try {
    if (locationInput.value !== "") {
      loader.style.display = "block";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=9c13504c0639e9b85fa4582326935900`
      );
      const data = await response.json();
      loader.style.display = "none";
      const temp = convertTemp(data.main.temp);
      locationInput.blur();
      errorDiv.style.display = "none";
      const fetchedData = {
        coords: data.coord,
        date: data.dt,
        humidity: data.main.humidity,
        temp: temp + "%",
        name: data.name,
        weather: data.weather,
        clouds: data.clouds.all,
      };
      localStorage.setItem("localdata", JSON.stringify(fetchedData));
      return fetchedData;
    } else {
        const localData = JSON.parse(localStorage.getItem("localdata"));
        return localData;
    }
  } catch (error) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = "Location not in database or No internet connection";
  }
};
