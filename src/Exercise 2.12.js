import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChangeFunction}) => {
  return (
    <input value={value} onChange={onChangeFunction} />
  )
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Countries = ({countries}) => {
  console.log(countries)
  if (countries.length > 5) {
    return (
      <div>Too many countries to list</div>
    )
  } else if (countries.length === 1) {
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
          <p key={i}>{country.name}</p>
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

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newSearch, setSearch] = useState('')
  const [ countriesToShow, setVisibleCountries] = useState(countries)
  
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      setVisibleCountries(response.data)
    })
  },
  [])

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
    </div>
  )
} 
export default App 