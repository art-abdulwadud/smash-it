const locationInput = document.querySelector('#location-input');

const convertTemp = (temp) => {
    return Math.floor(temp - 273.15);
};

const fetchWeather = async() => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=9c13504c0639e9b85fa4582326935900`);
        const data = await response.json();
        const temp = convertTemp(data.main.temp);
        return {
            coords: data.coord,
            date: data.dt,
            humidity: data.main.humidity,
            temp: temp + '%',
            name: data.name,
            weather: data.weather,
            clouds: data.clouds.all
        };
    } catch (error) {
        return error;
    }
};
