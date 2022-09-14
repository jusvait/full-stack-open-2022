import { useEffect, useState } from 'react'
import peopleService from './services/people'

const AddPerson = ({persons, onSuccess}) => {
  const [newEntry, setNewEntry] = useState({name: '', number: ''})

  const initialEntryValues = {
    name: '',
    number: '',
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (persons.some((val) => val.name === newEntry.name)) {
      alert(`${newEntry.name} is already added to phonebook`); return;
    }

    peopleService
      .create(newEntry)
      .then(newPerson => {
        onSuccess(persons.concat(newPerson))
      })

    setNewEntry(initialEntryValues)
  }

  const handleNameChange = (event) => {
    setNewEntry({...newEntry, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewEntry({...newEntry, number: event.target.value})
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
  return (<><p>{person.name} {person.number}</p><button onClick={() => onRemove(person.id)}>test</button></>)
}

const App = () => {
  const [filterState, setFilterState] = useState('');
  const [persons, setPersons] = useState([])

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const onPersonRemove = (id) => {
    peopleService
      .remove(id)
      .then(removed => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter filterValue={filterState} onFilterChange={setFilterState}/>
      <h2>Add a new</h2>
      <AddPerson persons={persons} onSuccess={setPersons}/>
      <h2>Number</h2>
      <People persons={persons.filter(v => v.name.toLocaleLowerCase().startsWith(filterState))} onRemove={onPersonRemove}/>
    </div>
  )

}

export default App