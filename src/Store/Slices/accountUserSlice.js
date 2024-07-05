import { createSlice } from '@reduxjs/toolkit';

// Obtener el estado almacenado en localStorage, si existe
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('my_profile');
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
    localStorage.setItem('my_profile', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const accountUserSlice = createSlice({
  name: 'accountUser',
  initialState: loadState() || {
    myProfileGlobalState: {},
  },
  reducers: {
    myProfileGlobalState: (state, action) => {
      state.myProfileGlobalState = {...state.myProfileGlobalState, ...action.payload}
      saveState(state)
    },
    updateMyProfileGlobalState: (state, action) => {
      state.myProfileGlobalState = { ...state.myProfileGlobalState, ...action.payload };
      console.log(state.myProfileGlobalState);
      saveState(state.myProfileGlobalState)
    },
  },
})

export const { myProfileGlobalState, updateMyProfileGlobalState } = accountUserSlice.actions

export default accountUserSlice.reducer