import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('lists');
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
    localStorage.setItem('lists', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const listsSlice = createSlice({
  name: 'allLists',
  initialState: loadState() || {
    allLists: {}
  },
  reducers: {
    allLists: (state, action) => {
      state.allLists = {...state.allLists, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateLists: (state, action) => {
      const updatedLists = action.payload;
      const index = Object.keys(state.allLists).find(key => state.allLists[key].id === updatedLists.id);
      
      if (index !== undefined) {
        state.allLists[index] = updatedLists;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteLists: (state, action) => {
      const { id, deleted_at } = action.payload;
      
      // Recorrer todas las keys de allLists
      for (const key of Object.keys(state.allLists)) {
        // Encontrar la institución que contenga el id proporcionado
        const listIndex = state.allLists[key].Lists.findIndex(inst => inst.id === id);
        
        if (listIndex !== -1) {
          // Actualizar el campo deleted_at de la institución encontrada
          state.allLists[key].lists[listIndex].deleted_at = deleted_at;
          break;  // Salir del bucle una vez que se haya encontrado y actualizado la institución
        }
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allLists, updateLists, softDeleteLists } = listsSlice.actions

export default listsSlice.reducer