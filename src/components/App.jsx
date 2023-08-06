import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './app.module.css';

export function App() {
  const [filter, setFilter] = useState('');
  const loginInputId = nanoid();
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') ?? [])
  );

  const createUser = dataUser => {
    const { name, number } = dataUser;
    const newContact = { id: loginInputId, name, number };
    const normalizedNewContact = newContact.name.toLowerCase();
    const contactExaminationthis = contacts.find(
      contact => contact.name.toLowerCase() === normalizedNewContact
    );
    if (contactExaminationthis) {
      return alert(`${dataUser.name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm createUser={createUser} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
