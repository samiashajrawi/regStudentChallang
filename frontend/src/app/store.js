import { combineReducers, configureStore } from '@reduxjs/toolkit'

import studentsReducer from '../features/StudentsList/studentsSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  students: studentsReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}