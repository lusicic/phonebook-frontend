import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => console.log('fail'))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map((person) => person.name).includes(newName)) {
      //alert(`${newName} is already in phonebook`)
      if (
        window.confirm(
          `${newName} is already in phonebook. Do you want to replace the number?`
        )
      ) {
        const person = persons.find((n) => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const id = person.id
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log('fail')
            showMessage(`Information of ${newName} is already there`, false)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          showMessage(`${newName} successfully added`, true)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          showMessage(JSON.stringify(error.response.data.error), false)
          console.log(error.response.data)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(setPersons(persons.filter((n) => n.id !== person.id)))
        .catch((error) => console.log('fail'))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const results = !searchTerm
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )

  const showMessage = (text, successMessage) => {
    setMessage(text)
    setSuccess(successMessage)

    setTimeout(() => {
      setMessage(null)
      setSuccess(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Notification message={message} success={success} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={results} deletePerson={deletePerson} />
    </div>
  )
}

export default App
