import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { setCurrentCity } from "../utils/slices/weatherSlice";
import { getWeather } from "../utils/slices/weatherSlice";

const Search = () => {
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');

    const searchCityWeather = (e) => {
        e.preventDefault();
        if (cityName == '' || cityName == undefined) {
            return;
        }
        dispatch(setCurrentCity({ cityName }));
        dispatch(getWeather({ cityName: cityName }));
        setCityName('');
    }
    const cityWeather = (e) => {
        e.preventDefault();
        setCityName(e.target.value)
    }
    return (
        <div className="search-box">
            <button className="btn-search" onClick={searchCityWeather}><FontAwesomeIcon icon={faSearch} /></button>
            <input type="text" onChange={cityWeather} value={cityName} className="input-search" placeholder="Type to Search..." />
        </div>
    )
}
export default Search;