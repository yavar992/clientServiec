import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import StatusCode from "../../utils/StatusCode";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  status: StatusCode.IDEL,
  message: null,
  total: 0,
  itemCount: 0,
};

// Get user's cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/add", cartItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Clear entire cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart/clear");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Checkout cart
export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/checkout", checkoutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.cartItems = [];
      state.total = 0;
      state.itemCount = 0;
      state.message = null;
      state.error = null;
    },
    updateCartTotal: (state) => {
      if (state.cartItems && state.cartItems.length > 0) {
        state.total = state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.itemCount = state.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      } else {
        state.total = 0;
        state.itemCount = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload?.items || [];
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
        cartSlice.caseReducers.updateCartTotal(state);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload?.items || [];
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
        cartSlice.caseReducers.updateCartTotal(state);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload?.items || [];
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
        cartSlice.caseReducers.updateCartTotal(state);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload?.items || [];
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
        cartSlice.caseReducers.updateCartTotal(state);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = null;
        state.cartItems = [];
        state.total = 0;
        state.itemCount = 0;
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      // Checkout cart
      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
        // Cart is cleared after successful checkout
        state.cart = null;
        state.cartItems = [];
        state.total = 0;
        state.itemCount = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      });
  },
});

export const { clearCartState, updateCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
