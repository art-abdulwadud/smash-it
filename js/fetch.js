const locationInput = document.querySelector('#location-input');

async function fetchWeather() {
    try {
        console.log(locationInput.value);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=nairobi&appid=9c13504c0639e9b85fa4582326935900`);
        const data = await response.json();
        const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
        exclude=hourly,daily&appid=9c13504c0639e9b85fa4582326935900`);
        const data2 = await secondResponse.json();
        console.log(data2);
    } catch (error) {
        return error;
    }
}