import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('remunerationbook');
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
    localStorage.setItem('remunerationbook', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const remunerationBookSlice = createSlice({
  name: 'allRemunerationBook',
  initialState: loadState() || {
    allRemunerationBook: {}
  },
  reducers: {
    allRemunerationBook: (state, action) => {
      state.allRemunerationBook = {...state.allRemunerationBook, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateRemunerationBook: (state, action) => {
      const updatedRemunerationBook = action.payload;
      
      const index = Object.keys(state.allRemunerationBook).find(key => state.allRemunerationBook[key].id === updatedRemunerationBook.id);
      if (index !== undefined) {
        state.allRemunerationBook[index] = updatedRemunerationBook;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteRemunerationBook: (state, action) => {
      const { id, deleted_at } = action.payload;
      const index = Object.keys(state.allRemunerationBook).find(key => state.allRemunerationBook[key].id === id);
      
      if (index !== undefined) {
        state.allRemunerationBook[index].deleted_at = deleted_at;
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allRemunerationBook, updateRemunerationBook, softDeleteRemunerationBook } = remunerationBookSlice.actions

export default remunerationBookSlice.reducer