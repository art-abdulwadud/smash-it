// DOM Elements
const breifInfoWrapper = document.querySelector(".brief-info-wrapper");
const searchIcon = document.querySelector(".search-icon ");
const weather = document.querySelector(".weather-main");
const cardHeader = document.querySelector(".card-header-text");
const tempDOM = document.querySelector(".temp");
const breifInfoIcon = document.querySelector(".brief-info-icon");
const humidity = document.querySelector(".humidity");
const clouds = document.querySelector(".clouds");
const description = document.querySelector(".description");
const currentTime = document.querySelector(".current-time");
const currently = document.querySelector(".currently");
const weekly = document.querySelector(".weekly");
let weeklyCardBody = document.querySelector(".weekly-body");
const currentCardBody = document.querySelector(".currentCardBody");
const cardBody2 = document.querySelectorAll('.card-body-2');
const mainCardBody = document.querySelector('.main-card-body');

// Global Varibals
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let active = 1;
let weeklyUpdate = 1;
let newWeatherMain;

const removeDOMElement = (elements) => {
  elements.forEach(ele => {
    const node = document.querySelector(ele);
    if(node) {
      node.remove();
    }
  })
};

const getDatetime = (datetime) => {
  const date = new Date(datetime * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "" + minutes;
  }
  currentTime.innerHTML = days[date.getDay()] + " at " + hours + ":" + minutes;
};

const getDayFromDate = (datetime) => {
  const date = new Date(datetime * 1000);
  const day = date.getDay();
  return days[day];
}

const toggleBtns = () => {
  if (active === 1) {
    currentCardBody.style.display = "block";
    weeklyCardBody.style.display = "none";
    currently.classList.add("active");
    weekly.classList.remove("active");
    active = 2;
  } else {
    weeklyCardBody.style.display = "block"
    currentCardBody.style.display = "none";
    currently.classList.remove("active");
    weekly.classList.add("active");
    active = 1;
  }
};

window.onload = () => {
  currently.addEventListener("click", (event) => {
    event.preventDefault()
    toggleBtns();
  });
  weekly.addEventListener("click", (event) => {
    event.preventDefault();
    toggleBtns()
  });
  addToBreifInfo();
};



const addWeeklyDataToDom = async (weeklyData) => {
  try {
      // First remove elements to avoid duplicates
      removeDOMElement(['.weekly-body','.item1', '.item2', '.item3', '.item4']); 
      weeklyCardBody = document.createElement('div');
      weeklyCardBody.classList.add('weekly-body');
      mainCardBody.append(weeklyCardBody);
      toggleBtns();
      // Then create new elements for refreshed data
      weeklyData.forEach((dayOfTheWeek) => {
        const dt = getDayFromDate(dayOfTheWeek.dt);
        const temp = convertTemp(dayOfTheWeek.temp.day);
        const icon = dayOfTheWeek.weather[0].icon;
        const des = dayOfTheWeek.weather[0].description;
        const card = document.createElement("div");
        card.classList.add("card", "card-body-2", "item1");
        weeklyCardBody.append(card);
        const cardHeader2 = document.createElement("h5");
        cardHeader2.classList.add("card-header", "medium-text", "item2");
        cardHeader2.innerText = dt;
        card.append(cardHeader2);
        const newCardBoby = document.createElement('div');
        newCardBoby.classList.add("card-body");
        card.append(newCardBoby);
        const newWeatherMain = document.createElement('p');
        newWeatherMain.classList.add('weather-main', 'small-text');
        newWeatherMain.innerText = des;
        newCardBoby.append(newWeatherMain);
        const center = document.createElement("div");
        center.classList.add('center', 'item3');
        newCardBoby.append(center);
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "item4", "temp");
        cardTitle.innerText = temp + '%';
        center.append(cardTitle);
        const newIconWrapper = document.createElement('div');
        newIconWrapper.classList.add('weather-icon-wrapper');
        center.append(newIconWrapper);
        const newWeatherIcon = document.createElement('img');
        newWeatherIcon.src =  `https://openweathermap.org/img/w/${icon}.png`;
        newWeatherIcon.classList.add('weather-icon');
        newIconWrapper.append(newWeatherIcon);
      });
  } catch (error) {
    return error.message;
  }
};

const addToBreifInfo = async () => {
  try {
    active = 1;
    const response = await fetchWeather();
    const data = await response;
    const main = data.weather[0].main;
    const icon = data.weather[0].icon;
    const des = data.weather[0].description;
    breifInfoWrapper.style.display = "block";
    animateCSS(".brief-info-wrapper", "zoomIn", () => {
      window.scrollTo({
        top: breifInfoWrapper.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    });
    cardHeader.innerHTML = data.name;
    weather.innerHTML = des;
    tempDOM.innerHTML = data.temp;
    breifInfoIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
    humidity.innerHTML = data.humidity;
    clouds.innerHTML = data.clouds;
    description.innerHTML = main;
    getDatetime(data.date);
    const weeklyData = await fetchWeatherWithCoords(data.coords);
    addWeeklyDataToDom(weeklyData.daily);
    console.log("weeklyupdate", weeklyUpdate);
  } catch (error) {
    return error.message;
  }
};

searchIcon.addEventListener("click", async () => {
  addToBreifInfo();
});
locationInput.addEventListener("keyup", async () => {
  if (event.keyCode === 13) {
    addToBreifInfo();
  }
});
