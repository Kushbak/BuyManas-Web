import { createStore, combineReducers, applyMiddleware } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import categoriesReducer from './reducers/categoriesReducer' 
import topPostsReducer from './reducers/topPostsReducer'

const rootReducer = combineReducers({
    categoriesBlock: categoriesReducer,
    topPostsBlock: topPostsReducer
})

const persistConfig = {
    key: 'root'
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware()
)

let persistor = persistStore(store)

export {store,persistor};