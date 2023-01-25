import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [],
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts
          .map(contact => contact.name)
          .includes(action.payload.name)
          ? alert(`${action.payload.name} is already in contacts.`)
          : state.contacts.push(action.payload);
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
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
