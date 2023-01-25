import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// const contactsInitialState =
//   JSON.parse(window.localStorage.getItem('contacts')) ?? [];
const initialState = {
  contacts: [
    //   { id: 'id-1', name: 'Vlad', number: '30948263846' },
    //   { id: 'id-2', name: 'Igor', number: '30948262345' },
    //   { id: 'id-3', name: 'Vova', number: '30234857235' },
    // ],
  ],
};
const contactsSlice = createSlice({
  name: 'contacts',
  // initialState: contactsInitialState,
  initialState: initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts
          .map(contact => contact.name)
          .includes(action.payload.name)
          ? alert(`${action.payload.name} is already in contacts.`)
          : state.contacts.push(action.payload);
        // window.localStorage.setItem('contacts', JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            id: nanoid(),
            name: data.name,
            number: data.number,
          },
        };
      },
    },

    deleteContact(state, action) {
      const index = state.contacts.findIndex(
        task => task.id === action.payload
      );
      state.contacts.splice(index, 1);
      // window.localStorage.setItem('contacts', JSON.stringify(state));
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
