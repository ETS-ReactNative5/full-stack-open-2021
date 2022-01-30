import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ data }) => {
  const {name: {common}, capital, population, languages, flags: {svg}} = data
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${common}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [data])

  return (
    <div>
      <h1>{common}</h1>
      <div>{`capital ${capital}`}</div>
      <div>{`population ${population}`}</div>
      <h2>Spoken languages</h2>
      <ul>
        {Object.keys(languages).map(item => (
          <li key={item}>{languages[item]}</li>
        ))}
      </ul>
      <img 
        height="100"
        width="100"
        src={svg}
        alt="country"
      />
      {Object.keys(weather).length > 0 && (
        <>
          <h2>{`Weather in ${common}`}</h2>
          <div>
            <span style={{ fontWeight: 'bold' }}>temperature: </span>
            <span>{`${weather.main.temp} Celcius`}</span>
          </div>
          <img
            height="50"
            width="50"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
          />
          <div>
            <span style={{ fontWeight: 'bold' }}>wind: </span>
            <span>{`${weather.wind.speed} meter/sec, direction: ${weather.wind.deg} degrees`}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default Country