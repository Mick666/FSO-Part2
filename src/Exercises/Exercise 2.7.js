import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const match = persons.find(person => person.name === newName);
    if (match) {
      alert (`${newName} is already added to the phonebook`)
      return;
    }
    const newPerson = {
      name: newName,
    }
    setPersons(persons.concat(newPerson))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((person, i) => 
          <p key={i}>{person.name} </p>
        )}
      </div>
    </div>
  )
}
export default App 