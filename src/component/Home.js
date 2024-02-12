import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [weatherData, setWeatherData] = useState();
    const cityQuery = 'pratapgarh';
    const units = 'metric';
    const API_KEY = '71e1771889506857f5179142aeff75d5';
    
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=> {
            if(position) {
                const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude + "&lon=" + position.coords.longitude +'&appid=' + API_KEY + '&units=' + units;
                axios.get(url).then(res=>{
                    let obj = {
                        city: res.data.name,
                        temp: res.data.main.temp,
                        weatherDescription: res.data.weather[0].description,
                        icon: res.data.weather[0].icon,
                        imageURL: 'http://openweathermap.org/img/wn/' + res.data.weather[0].icon +'@2x.png',
                        windSpeed: res.data.wind.speed,
                        humidity: res.data.main.humidity,
                        pressure: res.data.main.pressure,
                    }
                    setWeatherData(obj);
                    console.log(obj);
                })
            } else {
                const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityQuery +'&appid=' + API_KEY + '&units=' + units;
                axios.get(url).then(res=>{
                    let obj = {
                        city: res.data.name,
                        temp: res.data.main.temp,
                        weatherDescription: res.data.weather[0].description,
                        icon: res.data.weather[0].icon,
                        imageURL: 'http://openweathermap.org/img/wn/' + res.data.weather[0].icon +'@2x.png',
                        windSpeed: res.data.wind.speed,
                        humidity: res.data.main.humidity,
                        pressure: res.data.main.pressure,
                    }
                    console.log(obj);
                })
            }
        })
    },[])
    return(
        <div>
            <h1>{weatherData.city}</h1>
            <p>{weatherData.weatherDescription}</p>
            <h3>{weatherData.temp}</h3>
            <img src={weatherData.imageURL} />
        </div>
    )
}
export default Home;