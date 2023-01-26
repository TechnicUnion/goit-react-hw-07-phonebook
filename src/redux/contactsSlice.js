import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items
        .map(contact => contact.name)
        .includes(action.payload.name)
        ? alert(`${action.payload.name} is already in contacts.`)
        : state.contacts.items.push(action.payload);

      // state.contacts.items.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.contacts.items.findIndex(
        item => item.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const initialState = {
//   contacts: [],
// };
// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: initialState,
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.contacts
//           .map(contact => contact.name)
//           .includes(action.payload.name)
//           ? alert(`${action.payload.name} is already in contacts.`)
//           : state.contacts.push(action.payload);
//       },
//       prepare(data) {
//         return {
//           payload: {
//             id: nanoid(),
//             name: data.name,
//             number: data.number,
//           },
//         };
//       },
//     },

//     deleteContact(state, action) {
//       const index = state.contacts.findIndex(
//         task => task.id === action.payload
//       );
//       state.contacts.splice(index, 1);
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;
