import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './Slices/sessionSlice';
import accountReducer from './Slices/accountUserSlice';
import internalCategoriesReducer from './Slices/internalCategoriesSlice';
import typesConceptsReducer from './Slices/typesConceptsSlice';
import institutionsReducer from './Slices/institutionsSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    accountUser: accountReducer,
    internalCategories: internalCategoriesReducer,
    typesConcepts: typesConceptsReducer,
    institutions: institutionsReducer,
  }
})