import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('institutions');
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
    localStorage.setItem('institutions', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const InstitutionsSlice = createSlice({
  name: 'allInstitutions',
  initialState: loadState() || {
    allInstitutions: {}
  },
  reducers: {
    allInstitutions: (state, action) => {
      state.allInstitutions = {...state.allInstitutions, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updateInstitutions: (state, action) => {
      const updatedInstitutions = action.payload;
      const index = Object.keys(state.allInstitutions).find(key => state.allInstitutions[key].id === updatedInstitutions.id);
      
      if (index !== undefined) {
        state.allInstitutions[index] = updatedInstitutions;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeleteInstitutions: (state, action) => {
      const { id, deleted_at } = action.payload;
      
      // Recorrer todas las keys de allInstitutions
      for (const key of Object.keys(state.allInstitutions)) {
        // Encontrar la institución que contenga el id proporcionado
        const institutionIndex = state.allInstitutions[key].institutions.findIndex(inst => inst.id === id);
        
        if (institutionIndex !== -1) {
          // Actualizar el campo deleted_at de la institución encontrada
          state.allInstitutions[key].institutions[institutionIndex].deleted_at = deleted_at;
          break;  // Salir del bucle una vez que se haya encontrado y actualizado la institución
        }
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allInstitutions, updateInstitutions, softDeleteInstitutions } = InstitutionsSlice.actions

export default InstitutionsSlice.reducer