import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  

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
    setNewName("")
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person, i) => 
          <p key={i}>{person.name} {person.number} </p>
        )}
      </div>
    </div>
  )
} 
export default App 