import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter' 
import categoriesReducer from './categoriesReducer' 
import postsReducer from './postsReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer'



export default combineReducers({
  visibilityFilter,
  categoriesBlock: categoriesReducer,
  postsData: postsReducer,
  auth: authReducer,
  profilePage: profileReducer,
  form: formReducer,
  app: appReducer
})