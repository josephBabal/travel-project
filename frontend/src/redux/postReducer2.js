import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      console.log("==adding", action.payload)
     return [...state, action.payload]
    }
  },
})

// this is for dispatch
export const { addPost } = postSlice.actions;

// this is for configureStore
export default postSlice