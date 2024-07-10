import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('companies');
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
    localStorage.setItem('companies', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const companiesSlice = createSlice({
  name: 'allCompanies',
  initialState: loadState() || {
    allCompanies: {}
  },
  reducers: {
    allCompanies: (state, action) => {
      state.allCompanies = {...state.allCompanies, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updatedCompanies: (state, action) => {
      const updatedCompany = action.payload;
      const index = Object.keys(state.allCompanies).find(key => state.allCompanies[key].id === updatedCompany.id);
      
      if (index !== undefined) {
        state.allCompanies[index] = updatedCompany;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeletedCompany: (state, action) => {
      const { id, deleted_at } = action.payload;
      
      // Recorrer todas las keys de allCompanies
      for (const key of Object.keys(state.allCompanies)) {
        // Encontrar la institución que contenga el id proporcionado
        const companyIndex = state.allCompanies[key].company.findIndex(inst => inst.id === id);
        
        if (companyIndex !== -1) {
          // Actualizar el campo deleted_at de la institución encontrada
          state.allCompanies[key].lists[companyIndex].deleted_at = deleted_at;
          break;  // Salir del bucle una vez que se haya encontrado y actualizado la institución
        }
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allCompanies, updatedCompany, softDeletedCompany } = companiesSlice.actions

export default companiesSlice.reducer