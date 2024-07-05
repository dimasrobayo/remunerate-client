import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('internalcategories');
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
    localStorage.setItem('internalcategories', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const internalCategoriesSlice = createSlice({
  name: 'allInternalCategories',
  initialState: loadState() || {
    allInternalCategories: {}
  },
  reducers: {
    allInternalCategories: (state, action) => {
      state.allInternalCategories = {...state.allInternalCategories, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateInternalCategories: (state, action) => {
      const updatedInternalCategory = action.payload;
      
      const index = Object.keys(state.allInternalCategories).find(key => state.allInternalCategories[key].id === updatedInternalCategory.id);
      if (index !== undefined) {
        state.allInternalCategories[index] = updatedInternalCategory;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteInternalCategories: (state, action) => {
      const { id, deleted_at } = action.payload;
      const index = Object.keys(state.allInternalCategories).find(key => state.allInternalCategories[key].id === id);
      
      if (index !== undefined) {
        state.allInternalCategories[index].deleted_at = deleted_at;
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allInternalCategories, updateInternalCategories, softDeleteInternalCategories } = internalCategoriesSlice.actions

export default internalCategoriesSlice.reducer