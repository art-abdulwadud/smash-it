const fetchWeatherWithCoords = async(coords) => {
    try {
        const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&
        exclude=hourly, current&appid=${appId}`);
        const weeklyData = await secondResponse.json();
       return weeklyData;
    } catch (error) {
        return error;
    }
}