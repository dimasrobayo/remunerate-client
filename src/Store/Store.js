import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './Slices/sessionSlice';
import accountReducer from './Slices/accountUserSlice';
import internalCategoriesReducer from './Slices/internalCategoriesSlice';
import typesConceptsReducer from './Slices/typesConceptsSlice';
import institutionsReducer from './Slices/institutionsSlice';
import listsReducer from './Slices/listsSlice';
import companiesReducer from './Slices/companiesSlice';


export default configureStore({
  reducer: {
    session: sessionReducer,
    accountUser: accountReducer,
    internalCategories: internalCategoriesReducer,
    typesConcepts: typesConceptsReducer,
    institutions: institutionsReducer,
    lists: listsReducer,
    companies: companiesReducer,
  },
})