import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('employees');
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
    localStorage.setItem('employees', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const employeesSlice = createSlice({
  name: 'allEmployees',
  initialState: loadState() || {
    allEmployees: {}
  },
  reducers: {
    allEmployees: (state, action) => {
      state.allEmployees = {...state.allEmployees, ...action.payload}
      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    updatedEmployees: (state, action) => {
      const updatedEmployee = action.payload;
      const index = Object.keys(state.allEmployees).find(key => state.allEmployees[key].id === updatedEmployee.id);
      
      if (index !== undefined) {
        state.allEmployees[index] = updatedEmployee;
      }

      // Guardar en localStorage después de cada modificación
      saveState(state);
    },
    softDeletedEmployees: (state, action) => {
      const { id, deleted_at } = action.payload;
      
      // Recorrer todas las keys de allEmployees
      for (const key of Object.keys(state.allEmployees)) {
        // Encontrar la institución que contenga el id proporcionado
        const employeeIndex = state.allEmployees[key].company.findIndex(inst => inst.id === id);
        
        if (employeeIndex !== -1) {
          // Actualizar el campo deleted_at de la institución encontrada
          state.allEmployees[key].lists[employeeIndex].deleted_at = deleted_at;
          break;  // Salir del bucle una vez que se haya encontrado y actualizado la institución
        }
      }
      // Guardar en localStorage después de cada modificación
      saveState(state);
    }
  },
})

export const { allEmployees, updatedEmployees, softDeletedEmployees } = employeesSlice.actions

export default employeesSlice.reducer