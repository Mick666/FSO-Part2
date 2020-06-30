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
  console.log(countries)
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