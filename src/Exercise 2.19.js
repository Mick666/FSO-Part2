import React, { useState, useEffect } from 'react'
import noteService from './services/notes_phonebook'
import './index.css'

const Filter = ({value, onChangeFunction}) => {
  return (
    <input value={value} onChange={onChangeFunction} />
  )
}

const PersonForm = ({name, number, nameOnChange, numberOnChange, onSubmission}) => {
  return (
    <div>
      <form onSubmit={onSubmission}>
        <div>
        Name: <input value={name} onChange={nameOnChange} />
        </div>
        <div>
        Number: <input value={number} onChange={numberOnChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

const Persons = ({persons, deleteFunction}) => {
  return (
    <div>
      {persons.map((person, i) => 
        <div key={i} style={{display: "flex"}}>
          <p >{person.name} {person.number} </p>
          <button 
          data-key={person.id} 
          data-name={person.name}
          onClick={deleteFunction} 
          style={{height: "20px", marginLeft: "10px", marginTop: "15px"}}>Delete</button>
        </div>
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setSearch] = useState('')
  const [ peopleToShow, setVisibleNames] = useState(persons)
  const [notificationName, setNotificationName] = useState(null)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setVisibleNames(initialPersons)
      })
  },  [])

  const addName = (event) => {
    event.preventDefault();
    const nameMatch = persons.find(person => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    }  

    if (nameMatch && window.confirm(`${newName} is already added to the phone book. 
    Replace the old number with the new number?`)) {
      noteService
        .update(nameMatch.id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== nameMatch.id ? person : updatedPerson))
          setVisibleNames(persons.map(person => person.id !== nameMatch.id ? person : updatedPerson))
          setNotificationName(newPerson.name)
          setTimeout(() => {
            setNotificationName(null)
          }, 5000)
        })
      return;
    } 

    noteService
    .create(newPerson)
    .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setVisibleNames(persons.concat(addedPerson))
        setNotificationName(newPerson.name)
        setTimeout(() => {
          setNotificationName(null)
        }, 5000)
    })
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

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`notification`}>
        Added {message}
      </div>
    )
  }

  const deleteNumber = (event) => {
    if (window.confirm(`Delete ${event.target.dataset.name}?`)) {
      const id = Number(event.target.dataset.key)
      noteService
      .deleteEntry(id)
      .then(_ => {
        const updatedList = persons.filter(n => n.id !== id)
        setPersons(updatedList)
        setVisibleNames(updatedList)
      })
    }
  }

  return (
    <div>
      <Notification message={notificationName} />
      <h2>Phonebook</h2>
      <h3>Search the phonebook</h3>
      <Filter value={newSearch} onChangeFunction={handleSearch} />
      <h3>Add to the phonebook</h3>
      <PersonForm 
        name={newName}
        number={newNumber}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
        onSubmission={addName}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={peopleToShow}
        deleteFunction={deleteNumber}
      />
    </div>
  )
} 
export default App 