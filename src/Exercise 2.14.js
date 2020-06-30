import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({value, onChangeFunction}) => {
  return (
    <input value={value} onChange={onChangeFunction} />
  )
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const showCountry = (event) => {
  if (event.target.textContent === "Show") {
    event.target.textContent = "Hide"
    event.target.parentElement.parentElement.children[1].style.display = "block"
  } else if (event.target.textContent === "Hide") {
    event.target.textContent = "Show"
    event.target.parentElement.parentElement.children[1].style.display = "none"
  } 
}

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return (
      <div>
        <CountryInformation 
        name={countries[0].name}
        capital={countries[0].capital}
        population={countries[0].population}
        languages={countries[0].languages}
        flag={countries[0].flag}
        />
      </div>
    )
  }
  return (
    <div>
        {countries.map((country, i) => 
        <div key={i}>
          <div style={{display: "flex"}}>
            <p>{country.name}</p>
            <button onClick={showCountry} style={{height: "20px", marginLeft: "10px", marginTop: "15px"}}>Show</button>
          </div>
          <div style={{display: "none"}}>
            <CountryInformation 
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flag={country.flag}
            />
           </div>
        </div>
        )}
    </div>
  )
}

const LanguagesList = ({languages}) => {
  return (
    <div>
      <h3>Languages:</h3>
      <ul>
      {languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
    </div>
  )
}

const CountryInformation = ({name, capital, population, languages, flag}) => {
  return (
    <div>
      <h1>{name}</h1>
      <br></br>
      <p>Capital: {capital}</p>
      <p>Population: {numberWithCommas(population)}</p>
      <LanguagesList languages={languages} />
      <img src={flag} width="500" height="300"/>
    </div>
  )
}

const Weather = ({weatherData}) => {
  console.log(weatherData)
  if (!weatherData) {
    return <div></div>
  }
  return (
    <div>
      <p>Temperature: {weatherData.current.temperature}</p>
      <img src={weatherData.current.weather_icons} width="50" height="30"/>
      <p>Wind: {`${weatherData.current.wind_speed} mph direction ${weatherData.current.wind_dir}`}</p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newSearch, setSearch] = useState('')
  const [ countriesToShow, setVisibleCountries] = useState(countries)
  const [ weather, setWeather] = useState()
  
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      setVisibleCountries(response.data)
    })
  },
  [])

  useEffect(() => {
    if (countriesToShow.length !== 1) {
      return
    } 
    axios
    .get('http://api.weatherstack.com/current', {
      params: {
        access_key: api_key,
        query: countriesToShow[0].capital.toString(),
      }
    })
    .then(response => {
      console.log(countriesToShow[0].capital.toString())
      console.log(response)
      setWeather(response.data)
    })
  },
  [countriesToShow])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const searchTerm = event.target.value
    const filteredCountries = countries.filter(country => country.name.includes(searchTerm))
    setVisibleCountries(filteredCountries)
  }
  return (
    <div>
      <h2>Countries data</h2>
      <h3>Find countries</h3>
      <Filter value={newSearch} onChangeFunction={handleSearch} />
      <h2>Countries</h2>
      <Countries 
        countries={countriesToShow}
      />
      <Weather weatherData={weather} />
    </div>
  )
} 
export default App 