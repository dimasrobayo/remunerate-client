import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('token_educando');

    if (serializedState === false) {
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

// Guardar el estado en localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('token_educando', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: loadState() || {
    value: false,
  },
  reducers: {
    auth: (state) => {
      state.value = true
      saveState(true)
    },
    noAuth: (state) => {
      state.value = false
      saveState(false)
    },
  },
})

export const { auth, noAuth } = sessionSlice.actions

export default sessionSlice.reducer