import { createSlice } from '@reduxjs/toolkit';

const postListSlice = createSlice({
  name: "postList",
  initialState: [],     
  reducers: {
    addPost: (state, action) => 
      ([...state, action.payload])
      // state.push(action.payload)
  }
})

// this is for dispatch
export const { addPost } = postListSlice.actions;

// this is for configureStore
export default postListSlice.reducer;