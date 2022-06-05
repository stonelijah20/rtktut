import React from 'react';
import './App.css';
import {useAddContactMutation, useContactQuery, useSinglecontactQuery} from './services/ContactApi'

function App() {
  const {data, error, isLoading, isFetching, isSuccess} = useContactQuery();
  return (
    <div className="App">
      <header className="App-header">
        <h1>RTK Query!</h1>
      </header>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching Data...</h2>}
      {error && <h2>Something went wrong!</h2>}
      {isSuccess && (
        <div>
          {data.map((contacts) => {
            return (
              <div key={contacts.id}>
                <span>{contacts.name}</span>
                <span><ContactDetails id={contacts.id}/></span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export const ContactDetails = ({id}: {id: string}) => {
  const {data} = useSinglecontactQuery(id);
  return (
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  )
}

export const AddContact = () => {
  const [addContact] = useAddContactMutation
  const contact = {
    "id": 11,
    "name": "Ston Elijah",
    "username": "Moriah.Stanton",
    "email": "stonelijah@gmail.biz",
  }
  const addHandler = async() => {
    await addContact(contact) 
  }
  return (
    <>
      <button onClick={addHandler}>Add+</button>
    </>
  )
}

export default App;
