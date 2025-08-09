import React from "react";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/`;

const dateBuilder = (d) => { 
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});

  const search = (evt) => {
    if (evt.key === "Enter" && query.trim() !== "") {
      fetch(`${url}weather?q=${query}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className={
      typeof weather.main !== "undefined"
        ? (weather.main.temp > 16 ? 'app warm' : 'app')
        : 'app'
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search the weather by city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main !== "undefined" && (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

