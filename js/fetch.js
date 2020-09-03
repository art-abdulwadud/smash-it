const locationInput = document.querySelector('#location-input');
const searchIcon = document.querySelector('.search-icon ');

searchIcon.addEventListener('click', async function fetchWeather() {
    try {
        console.log(locationInput.value);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=9c13504c0639e9b85fa4582326935900`);
        const data = await response.json();
        console.log(data);
        const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
        exclude=hourly,daily&appid=9c13504c0639e9b85fa4582326935900`);
        const data2 = await secondResponse.json();
        console.log(data2);
    } catch (error) {
        return error;
    }
});