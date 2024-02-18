import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from './component/Home';
import Search from './component/Search';

import { setCordinates, getWeather } from "./utils/slices/weatherSlice";

import './App.css';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position) {
				dispatch(setCordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude }))
				dispatch(getWeather({ cityName: '', latitude: position.coords.latitude, longitude: position.coords.longitude }));
			} else {
				alert('Location access denied! Search manually');
			}
		})
	}, [])
	return (
		<div className="App">
			<Search />
			<Home />
		</div>
	);
}

export default App;
