import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [weatherData, setWeatherData] = useState();
    const cityQuery = 'pratapgarh';
    const units = 'metric';
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
                const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + "&lon=" + position.coords.longitude + '&appid=' + API_KEY + '&units=' + units;
                getWeather(url);
            } else {
                const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityQuery + '&appid=' + API_KEY + '&units=' + units;
                getWeather(url);
            }
        })
    }, [])

    const getWeather = (url) => {
        axios.get(url).then(res => {
            let obj = {
                city: res.data.name,
                temp: res.data.main.temp,
                weatherDescription: res.data.weather[0].description,
                icon: res.data.weather[0].icon,
                imageURL: 'http://openweathermap.org/img/wn/' + res.data.weather[0].icon + '@2x.png',
                windSpeed: res.data.wind.speed,
                humidity: res.data.main.humidity,
                pressure: res.data.main.pressure,
            }
            setWeatherData(obj);
            console.log(obj);
        })
    }
    const capitalizeFirstLetter = (string) => {
        return "(" + string.charAt(0).toUpperCase() + string.slice(1) + ")"
    }
    const roundToOneDecimal = (num) => {
        return Math.round(num * 10) / 10
    }

    return (
        <div className="card">
            {weatherData ? <>
                <h1>{weatherData.city}</h1>
                <p>{capitalizeFirstLetter(weatherData.weatherDescription)}</p>
            <hr></hr>
                <div className="parent">
                    <div className="temp-div"><span className="temperature">{roundToOneDecimal(weatherData.temp)} °</span></div>
                    <div><img src={weatherData.imageURL} /></div>
                </div>
                
            </> : null}
        </div>
    )
}
export default Home;