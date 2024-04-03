import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlicer';
import productSlice from './productSlicer';
import cartSlice from './cartSlicer';


const FoodStore = configureStore({
  reducer:{
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart : cartSlice.reducer
  }
});

export default FoodStore;
