import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../services/api";
import StatusCode from "../../utils/StatusCode";

const initialState = {
  restaurants: [],
  loading: false,
  error: null,
  status: StatusCode.IDEL,
  message: null,
  restaurant: null,
  userRestaurant: null,
  events: [],
  restaurantEvents: [],
  categories: [],
  cart: null,
  cartItems: [],
  searchResults: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    size: 10,
  },
};

// Fetch all restaurants with pagination
export const fetchResturants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, size = 10, category, search } = params;
      let url = `/restaurants?page=${page - 1}&size=${size}`;

      if (category) url += `&category=${category}`;
      if (search) url += `&search=${search}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  "restaurants/fetchRestaurantById",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create restaurant (Admin)
export const createRestant = createAsyncThunk(
  "restaurants/createRestaurant",
  async (restaurant, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/restaurants", restaurant);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update restaurant (Admin)
export const updateRestaurant = createAsyncThunk(
  "restaurants/updateRestaurant",
  async (restaurant, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/restaurants/${restaurant.id}`,
        restaurant
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete restaurant (Admin)
export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update restaurant status (Admin)
export const updateRestaurantStatus = createAsyncThunk(
  "restaurants/updateRestaurantStatus",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/restaurants/${restaurantId}/status`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search restaurants by keyword
export const searchRestaurants = createAsyncThunk(
  "restaurants/searchRestaurants",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/restaurants/search?keyword=${encodeURIComponent(keyword)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create category (Admin)
export const createCategory = createAsyncThunk(
  "restaurants/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/category", category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get restaurant categories
export const getRestaurantCategory = createAsyncThunk(
  "restaurants/getRestaurantCategory",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get all categories
export const getAllCategories = createAsyncThunk(
  "restaurants/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/category");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create restaurant events (Admin)
export const createRestaurantEvents = createAsyncThunk(
  "restaurants/createRestaurantEvents",
  async (events, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/events", events);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get restaurant events
export const getRestaurantEvents = createAsyncThunk(
  "restaurants/getRestaurantEvents",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/events/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get event by ID
export const getRestaurantEventsById = createAsyncThunk(
  "restaurants/getRestaurantEventsById",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete restaurant events (Admin)
export const deleteRestaurantEvents = createAsyncThunk(
  "restaurants/deleteRestaurantEvents",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Cart operations
export const getCart = createAsyncThunk(
  "restaurants/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "restaurants/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/add", cartItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "restaurants/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "restaurants/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "restaurants/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart/clear");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all restaurants
      .addCase(fetchResturants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchResturants.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.restaurants = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(fetchResturants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //fetch restaurant by id
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.restaurant = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //create restaurant
      .addCase(createRestant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(createRestant.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userRestaurant = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(createRestant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //update restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //delete restaurant
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //update restaurant status
      .addCase(updateRestaurantStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(updateRestaurantStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(updateRestaurantStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //search restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.restaurants = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.categories = [...state.categories, action.payload.payload];
        state.status = StatusCode.SUCCESS;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //get restaurant category
      .addCase(getRestaurantCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(getRestaurantCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.categories = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(getRestaurantCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //get all categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.categories = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //create restaurant events
      .addCase(createRestaurantEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(createRestaurantEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.events = [...state.events, action.payload.payload];
        state.restaurantEvents = [
          ...state.restaurantEvents,
          action.payload.payload,
        ];
        state.status = StatusCode.SUCCESS;
      })
      .addCase(createRestaurantEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //get restaurant events
      .addCase(getRestaurantEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(getRestaurantEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.restaurantEvents = action.payload.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(getRestaurantEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //delete restaurant events
      .addCase(deleteRestaurantEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(deleteRestaurantEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
        state.restaurantEvents = state.restaurantEvents.filter(
          (event) => event.id !== action.payload
        );
        state.status = StatusCode.SUCCESS;
      })
      .addCase(deleteRestaurantEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      //cart operations
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload.items;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload.items;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload.items;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.cart = action.payload.payload;
        state.cartItems = action.payload.payload.items;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      })

      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = StatusCode.LOADING;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.cart = null;
        state.cartItems = [];
        state.status = StatusCode.SUCCESS;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = StatusCode.ERROR;
      });
  },
});

export default restaurantSlice.reducer;
