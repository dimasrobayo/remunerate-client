import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('typesconcepts');
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
    localStorage.setItem('typesconcepts', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const TypesConceptsSlice = createSlice({
  name: 'allTypesConcepts',
  initialState: loadState() || {
    allTypesConcepts: {}
  },
  reducers: {
    allTypesConcepts: (state, action) => {
      state.allTypesConcepts = {...state.allTypesConcepts, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateTypesConcepts: (state, action) => {
      const updatedTypeConcept = action.payload;
      
      const index = Object.keys(state.allTypesConcepts).find(key => state.allTypesConcepts[key].id === updatedTypeConcept.id);
      if (index !== undefined) {
        state.allTypesConcepts[index] = updatedTypeConcept;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteTypesConcepts: (state, action) => {
      const { id, deleted_at } = action.payload;
      const index = Object.keys(state.allTypesConcepts).find(key => state.allTypesConcepts[key].id === id);
      
      if (index !== undefined) {
        state.allTypesConcepts[index].deleted_at = deleted_at;
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allTypesConcepts, updateTypesConcepts, softDeleteTypesConcepts } = TypesConceptsSlice.actions

export default TypesConceptsSlice.reducer