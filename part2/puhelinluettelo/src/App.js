import { useState } from 'react'

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

    onSuccess(persons.concat(newEntry));
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

const People = ({persons}) => {
  return (
    <>
      {persons.map(person => <Person person={person} key={person.name}/>)}    
    </>
  )
}

const Person = ({person}) => {
  return (<p>{person.name} {person.number}</p>)
}

const App = () => {
  const [filterState, setFilterState] = useState('');

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter filterValue={filterState} onFilterChange={setFilterState}/>
      <h2>Add a new</h2>
      <AddPerson persons={persons} onSuccess={setPersons}/>
      <h2>Number</h2>
      <People persons={persons.filter(v => v.name.toLocaleLowerCase().startsWith(filterState))}/>
    </div>
  )

}

export default App