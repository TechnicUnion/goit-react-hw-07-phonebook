// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { filterValue } from 'redux/filtersSlice';
import { deleteContact, fetchContacts } from 'redux/operations';

export default function App() {
  const filter = useSelector(state => state.filter);
  const contactsLict = useSelector(state => state.contacts);

  const dispatch = useDispatch();
  // const isLoading = useSelector(state => state.contacts.isLoading);
  // const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const changeFilter = eve => {
    dispatch(filterValue(eve.currentTarget.value));
  };

  const getFilteredOutContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contactsLict.contacts.items.filter(person =>
      person.name.includes(normalizeFilter)
    );
  };

  const deletContact = contactsId => {
    dispatch(deleteContact(contactsId));
  };

  const filteredOutContactsList = getFilteredOutContacts();

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        itemList={filteredOutContactsList}
        onDeleteClick={deletContact}
      />
    </div>
  );
}
