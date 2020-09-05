const fetchWeatherWithCoords = async() => {
    try {
        let description, icon, main;
        Object.entries(data.weather).forEach(key => {
            description = key[1].description;
            icon = key[1].icon;
            main = key[1].main;
            console.log(description, icon, main);
        })
        const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
        exclude=hourly,daily&appid=${appId}`);
        const data2 = await secondResponse.json();
    } catch (error) {
        return error;
    }
}