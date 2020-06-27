import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

// This is the code used by the instructional portions of the FSO course (as compared to the assignments)

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }
  useEffect(hook, [])
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  },
  [])
  
  console.log('render', notes.length, 'notes')
  return (
    <div>
    <h1>Notes</h1>
    <ul>
    {notes.map(note =>
      <Note key={note.id} note={note} />
      )}
      </ul>  
      </div>
      )
    }
    
    export default App 