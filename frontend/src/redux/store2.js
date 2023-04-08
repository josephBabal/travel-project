import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postReducer';
export const store = configureStore({
  reducer: {
    postList: postReducer.reducer
  },
})

console.log("==store", store.getState())
