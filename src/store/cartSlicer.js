import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:'cart',
  initialState: [],
  reducers:{
    addToCart: (store, action) => {
    return [...store, action.payload];
    },
    increment:(state, action) =>{
      const itemId = action.payload;
      const itemToUpdate = state.find(item => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.qty += 1;
      }
    },
    decrement:(state, action) =>{
      const itemId = action.payload;
      const itemToUpdate = state.find(item => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.qty -= 1;
      }
    },
    clearCart : (state) => {
      return state = [];
    }
  }
});


export const cartActions = cartSlice.actions;


export default cartSlice;