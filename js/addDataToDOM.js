const breifInfoWrapper = document.querySelector('.brief-info-wrapper');
const searchIcon = document.querySelector(".search-icon ");
const weather = document.querySelector(".weather-main");
const cardHeader = document.querySelector(".card-header");
const tempDOM = document.querySelector(".temp");
const breifInfoIcon = document.querySelector(".brief-info-icon");
const humidity = document.querySelector(".humidity");
const clouds = document.querySelector(".clouds");
const description = document.querySelector(".description");

const getDatetime = (datetime) => {
  const date = new Date(datetime * 1000);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTime = document.querySelector(".current-time");
  currentTime.innerHTML = days[day - 1] + " at " + hours + ":" + minutes;
};

const addToBreifInfo = async () => {
  try {
    const response = await fetchWeather();
    const data = await response;
    let main, icon, des;
    Object.entries(data.weather).forEach((key) => {
      main = key[1].main;
      icon = key[1].icon;
      des = key[1].description;
    });
    breifInfoWrapper.style.display = 'block';
    cardHeader.innerHTML = data.name;
    weather.innerHTML = main;
    tempDOM.innerHTML = data.temp;
    breifInfoIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    humidity.innerHTML = data.humidity;
    clouds.innerHTML = data.clouds;
    description.innerHTML = des;
    getDatetime(data.date);
  } catch (error) {
    return error;
  }
};

searchIcon.addEventListener("click", async () => addToBreifInfo());
locationInput.addEventListener("keyup", async () => {
  if (event.keyCode === 13) {
    addToBreifInfo();
  }
});
