import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('regions');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

// Guardar el estado en localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('regions', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const regionsSlice = createSlice({
    name: 'allRegions',
    initialState: loadState() || {
        allRegions: {}
    },
    reducers: {
        allRegions: (state, action) => {
            state.allRegions = {...state.allRegions, ...action.payload}
            // Guardar en localStorage después de cada modificación
            saveState(state);
        },
    },
})

export const { allRegions } = regionsSlice.actions

export default regionsSlice.reducer