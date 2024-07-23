import { configureStore } from '@reduxjs/toolkit';
import regionsReducer from './Slices/regionsSlice';
import sessionReducer from './Slices/sessionSlice';
import accountReducer from './Slices/accountUserSlice';
import internalCategoriesReducer from './Slices/internalCategoriesSlice';
import typesConceptsReducer from './Slices/typesConceptsSlice';
import institutionsReducer from './Slices/institutionsSlice';
import listsReducer from './Slices/listsSlice';
import companiesReducer from './Slices/companiesSlice';
import remunerationBookReducer from './Slices/remunerationBookSlice';

export default configureStore({
  reducer: {
    regions: regionsReducer,
    session: sessionReducer,
    accountUser: accountReducer,
    internalCategories: internalCategoriesReducer,
    typesConcepts: typesConceptsReducer,
    institutions: institutionsReducer,
    lists: listsReducer,
    companies: companiesReducer,
    remunerationBook: remunerationBookReducer,
  },
})