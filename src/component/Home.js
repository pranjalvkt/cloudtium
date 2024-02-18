import sunrise from '../sunrise.png';
import sunset from '../sunset.png';
import humidity from '../humidity.png';
import wind from '../windock.png'

import { useSelector } from "react-redux";

import capitalizeFirstLetter from '../utils/capitalize';
import roundToOneDecimal from '../utils/roundOf';
import getTime from '../utils/getTime';

const Home = () => {
    const {weatherData} = useSelector((state)=> state.weather.value);
    
    return (
        <div className="card">
            {weatherData ? <>
                <h1>{weatherData.city}</h1>
                <p>{capitalizeFirstLetter(weatherData.weatherDescription)}</p>
                <hr></hr>
                <div className="parent">
                    <div className="div-one">
                        <div className="temp-div"><span className="temperature">{roundToOneDecimal(weatherData.temp)} °</span></div>
                        <div><img src={weatherData.imageURL} /></div>
                    </div>
                    <div className="div-two">
                        <div className="row">
                            <span>
                                <img src={sunrise} className="small-icon" />
                                <span>Sunrise: {getTime(weatherData.sunrise)}</span>
                            </span>
                            <span>
                                <img src={sunset} className="small-icon" />
                                <span>Sunset: {getTime(weatherData.sunset)}</span>
                            </span>
                        </div>

                        <div className="row">
                            <span>
                                <img src={humidity} className="small-icon" />
                                <span>Humidity: {weatherData.humidity} %</span>
                            </span>
                            <span>
                                <img src={wind} className="small-icon" />
                                <span>Wind Speed: {weatherData.windSpeed} kmph</span>
                            </span>
                        </div>
                    </div>
                </div>
            </> : null}
        </div>
    )
}
export default Home;