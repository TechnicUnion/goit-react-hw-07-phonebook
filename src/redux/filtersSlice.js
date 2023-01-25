import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = '';

const filtersSlice = createSlice({
  name: 'filter',
  initialState: filtersInitialState,
  reducers: {
    filterValue(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterValue } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
