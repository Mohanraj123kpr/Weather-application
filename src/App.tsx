import './App.css'
import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'


function App() {
  interface WeatherData {
    weather: { main: string; description: string; icon: string }[];
    name: string;
    main: { temp: number; humidity: number };
    wind: { speed: number };
    // Add other properties from the API response if needed
  }

  const [weather, setWeather] = useState<WeatherData | null>(null)
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      setWeather(response.data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  const getWeatherClass = () => {
    if (!weather) return 'default-weather';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'bg-clear';
      case 'clouds':
        return 'bg-clouds';
      case 'rain':
      case 'drizzle':
        return 'bg-rain';
      case 'snow':
        return 'bg-snow';
      case 'thunderstorm':
        return 'bg-thunder';
      case 'mist':
      case 'fog':
        return 'bg-fog';
      default:
        return 'default-weather';
    }
  };

  const getWeatherVideo = () => {
    if (!weather) return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/clear-lwkR39416b1WuAUwiGPuqobhihpSYe.mp4';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'rain':
      case 'drizzle':
        return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/rain-SiolttYZcwwRZQqaiX5a4ewx9LE6Jg.mp4';
      case 'snow':
        return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/snow-KHkVGWUJA0x0btwIQEeuRgjuQbUYua.mp4';
      case 'clouds':
        return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/cloudy-W7N8WcP6EQxTY7LiZw1x4Y3BHUqJB8.mp4';
      case 'thunderstorm':
        return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/thunder-xubpX1Xjh2T6SzCfE2KqXHFB5fXJtW.mp4';
      default:
        return 'https://db8g7ep6sj3uzmz9.public.blob.vercel-storage.com/clear-lwkR39416b1WuAUwiGPuqobhihpSYe.mp4';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-4 z-10">
      {/* 🎥 Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={getWeatherVideo()}
      />
      <div className="bg-black/50 p-6 rounded-lg backdrop-blur-md shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather App</h1>
        <SearchBar onSearch={fetchWeather} />
        <WeatherCard data={weather} />
      </div>
    </div>
  );
}

export default App
