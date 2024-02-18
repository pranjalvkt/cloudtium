import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getWeather = createAsyncThunk('/getWeather', async (formData) => {
    try {
        let query;
        if (formData.cityName == undefined || formData.cityName == '') {
            query = 'lat=' + formData.latitude + "&lon=" + formData.longitude + '&appid=' + process.env.REACT_APP_WEATHER_API_KEY + '&units=metric';
        } else {
            query = 'q=' + formData.cityName + '&appid=' + process.env.REACT_APP_WEATHER_API_KEY + '&units=metric';
        }
        const url = 'https://api.openweathermap.org/data/2.5/weather?' + query;
        const res = await axios.get(url);
        return res.data;
    }
    catch (err) {
        console.log(err.response.data.error);
        alert(err.response.data.error);
    }
});
const filterData = (data) => {
    let obj = {
        city: data.name,
        temp: data.main.temp,
        weatherDescription: data.weather[0].description,
        imageURL: 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png',
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
    }
    return obj;
}
const initialValOfState = {
    weatherData: {
        city: '',
        temp: '',
        weatherDescription: '',
        imageURL: '',
        windSpeed: '',
        humidity: '',
        pressure: '',
        sunrise: '',
        sunset: '',
    },
    currentCity: '',
    latitude: '',
    longitude: '',
    error: ''
}
const userSlice = createSlice(
    {
        name: 'weather',
        initialState: {
            value: initialValOfState
        },
        reducers: {
            setCurrentCity: (state, action) => {
                state.value.currentCity = action.payload.cityName;
            },
            setCordinates: (state, action) => {
                state.value.latitude = action.payload.latitude;
                state.value.longitude = action.payload.longitude;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(getWeather.fulfilled, (state, action) => {
                state.value.weatherData = filterData(action.payload);
            }).addCase(getWeather.rejected, (state, action) => {
                // Handle the rejected action
                console.error('Error in getWeather:', action.error.message);
                state.value.error = action.error.message;
            })
        }
    }
)
export const { setCurrentCity, setCordinates } = userSlice.actions;
export default userSlice.reducer;
