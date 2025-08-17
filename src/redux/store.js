import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import restaurantSlice from "./slices/restaurantSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    restaurants: restaurantSlice,
    cart: cartSlice,
  },
});

export default store;
