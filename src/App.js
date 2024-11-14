import axios from 'axios';
import { useState } from 'react';
import './app.css'; 

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState('');
  const KEY = '9a61f229741aa856d43699768e4fe3da';

  const search = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`)
      .then(({ data }) => {
        const allForecasts = data.list;
        const dailyForecasts = allForecasts.filter(forecast =>
          forecast.dt_txt.includes('12:00:00')
        ).slice(0, 4);
        setData(dailyForecasts);
        console.log(dailyForecasts);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных о погоде:', error);
        setData();
      });
  };

  return (
    <div className="container">
      <h1 className="title">Прогноз погоды</h1>
      <div className="search-container">
        <input
          type="text"
          className="city-input"
          placeholder="Введите город"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => search(city)}
        >
          Поиск
        </button>
      </div>

      {data && (
        <div className="for-container">
          {data.map((forecast, index) => (
            <div key={index} className="item">
              <p className="forecast-date">{forecast.dt_txt}</p>
              <h2 className="forecast-temp">{(forecast.main.temp).toFixed(0)}°C</h2>
              <p className="forecast-weather">{forecast.weather[0]?.main}</p>
              <p className="forecast-wind">Ветер: {forecast.wind.gust} м/с</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
