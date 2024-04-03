import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name:'product',
  initialState: [],
  reducers:{
    addProduct: (store, action) => {
    return store =  action.payload;
    }
  }
});


export const productActions = productSlice.actions;


export default productSlice;