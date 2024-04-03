import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState: null,
  reducers:{
    storeUser: (store, action) => {
    return store = action.payload;
    },
    logOutUser : (store) => {
      return store = null
    }
  }
});


export const userActions = userSlice.actions;


export default userSlice;