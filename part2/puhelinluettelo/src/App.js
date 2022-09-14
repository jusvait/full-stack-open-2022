import { useEffect, useState } from 'react'
import peopleService from './services/people'

import './App.css'

const AddPerson = ({newEntry, onSubmit, onChange}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  const handleNameChange = (event) => {
    onChange({...newEntry, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    onChange({...newEntry, number: event.target.value})
  }
  return (
    <><form onSubmit={handleSubmit}>
      <div>
        name: <input value={newEntry.name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newEntry.number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form></>
  )
}

const NameFilter = ({filterValue, onFilterChange}) => {
  return (
    <div>
      filter shown with: <input value={filterValue} onChange={(event) => onFilterChange(event.target.value)}/>
    </div>)
}

const People = ({persons, onRemove}) => {
  return (
    <>
      {persons.map(person => <Person person={person} key={person.name} onRemove={onRemove}/>)}    
    </>
  )
}

const Person = ({person, onRemove}) => {
  const remove = () => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      onRemove(person)
    }
  }

  return (<><p>{person.name} {person.number}</p><button onClick={() => remove()}>Delete</button></>)
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const initialEntryValues = {
    name: '',
    number: '',
  }

  const [filterState, setFilterState] = useState('');
  const [persons, setPersons] = useState([])
  const [newEntry, setNewEntry] = useState(initialEntryValues)
  const [errorState, setErrorState] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const showMessage = (msg, dur) => {
    setErrorState(msg)
        setTimeout(() => {
          setErrorState(null)
        }, dur * 1000)
  }

  const onPersonAdd = () => {
    if (persons.some((val) => val.name === newEntry.name)) {
      alert(`${newEntry.name} is already added to phonebook`);
      return;
    }

    peopleService
      .create(newEntry)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        showMessage(`Added ${newEntry.name}`, 4)
      })

    setNewEntry(initialEntryValues)
  }

  const onPersonRemove = (person) => {
    peopleService
      .remove(person.id)
      .then(removed => {
        setPersons(persons.filter(p => p.id !== person.id))
        showMessage(`Removed ${person.name}`, 4)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorState} />
      <NameFilter filterValue={filterState} onFilterChange={setFilterState}/>
      <h2>Add a new</h2>
      <AddPerson newEntry={newEntry} onChange={setNewEntry} onSubmit={onPersonAdd}/>
      <h2>Number</h2>
      <People persons={persons.filter(v => v.name.toLocaleLowerCase().startsWith(filterState))} onRemove={onPersonRemove}/>
    </div>
  )

}

export default App