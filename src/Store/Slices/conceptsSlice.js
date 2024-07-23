import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('concepts');
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
    localStorage.setItem('concepts', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const conceptsSlice = createSlice({
  name: 'allConcepts',
  initialState: loadState() || {
    allConcepts: {}
  },
  reducers: {
    allConcepts: (state, action) => {
      state.allConcepts = {...state.allConcepts, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateConcepts: (state, action) => {
      const updatedConcepts = action.payload;
      
      const index = Object.keys(state.allConcepts).find(key => state.allConcepts[key].id === updatedConcepts.id);
      if (index !== undefined) {
        state.allConcepts[index] = updatedConcepts;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteConcepts: (state, action) => {
      const { id, deleted_at } = action.payload;
      const index = Object.keys(state.allConcepts).find(key => state.allConcepts[key].id === id);
      
      if (index !== undefined) {
        state.allConcepts[index].deleted_at = deleted_at;
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allConcepts, updateConcepts, softDeleteConcepts } = conceptsSlice.actions

export default conceptsSlice.reducer