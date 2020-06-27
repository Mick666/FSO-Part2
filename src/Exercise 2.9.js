import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setSearch] = useState('')
  const [ peopleToShow, setVisibleNames] = useState(persons)
  
  

  const addName = (event) => {
    event.preventDefault();
    const nameMatch = persons.find(person => person.name === newName);
    if (nameMatch) {
      alert (`${newName} is already added to the phonebook`)
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newPerson))
    setVisibleNames(persons.concat(newPerson))
    setNewName("")
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const searchTerm = event.target.value
    const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0)
    setVisibleNames(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search the phonebook</h3>
        <input value={newSearch} onChange={handleSearch} />
      <h3>Add to the phonebook</h3>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}  />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Numbers</h2>
      <div>
      {peopleToShow.map((person, i) => 
          <p key={i}>{person.name} {person.number} </p>
        )}
      </div>
    </div>
  )
} 
export default App 