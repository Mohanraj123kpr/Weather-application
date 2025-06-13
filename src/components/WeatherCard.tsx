interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}

const WeatherCard = ({data}: {data: WeatherData | null}) => {
    if(!data) return null;

    const { name, main, weather, wind } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    return (
        <div className="p-6 rounded-lg shadow-lg bg-white text-center w-80 text-black">
        <h2 className="text-xl font-bold">{name}</h2>
        <img src={iconUrl} alt={weather[0].description} className="mx-auto" />
        <p className="text-lg capitalize">{weather[0].description}</p>
        <p className="text-4xl font-bold">{main.temp}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
         </div> 
    )
}

export default WeatherCard;
