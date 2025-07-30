import { RootState } from '@/redux/store';
import { Color, Size } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
 /** Unique product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product image URL */
  image: string;
  /** Base product price */
  basePrice: number;
  /** Actual price (could include discounts) */
  price: number;
  /** Quantity in cart (min 1) */
  quantity: number;
  /** Selected size (optional) */
  size?: Size;
  /** Selected colors (optional) */
  colors?: Color[];
};

type CartState = {
  items: CartItem[];
};

const initialCartItems =
  typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;

// const initialCartItems = localStorage.getItem('cartItems'); 


const initialState: CartState = {
  items: initialCartItems ? JSON.parse(initialCartItems) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.colors = action.payload.colors;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, removeCartItem, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
