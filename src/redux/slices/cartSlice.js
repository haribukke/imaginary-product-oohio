import { createSlice, createSelector } from '@reduxjs/toolkit';
import { MOCK_PRODUCTS } from '../../constants/products';

const initialState = {
  items: MOCK_PRODUCTS,
  couponCode: '',
  appliedCoupon: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    upsertItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        // Set absolute quantity instead of accumulating
        existingItem.quantity = newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setAppliedCoupon: (state, action) => {
      // Basic validation logic moved here or kept in component?
      // For now, simple setter, validation usually happens before dispatch or via thunk
      state.appliedCoupon = action.payload;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
        state.items = [];
        state.appliedCoupon = null;
        state.couponCode = '';
    }
  },
});

export const { setCartItems, addItem, upsertItem, setCouponCode, setAppliedCoupon, updateQuantity, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCouponCode = (state) => state.cart.couponCode;
export const selectAppliedCoupon = (state) => state.cart.appliedCoupon;

export const selectSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectTax = createSelector(
    [selectSubtotal],
    (subtotal) => subtotal * 0.08
);

export const selectShipping = createSelector(
    [selectSubtotal],
    (subtotal) => (subtotal > 50 ? 0 : 9.99)
);

export const selectDiscount = createSelector(
    [selectSubtotal, selectAppliedCoupon, selectShipping],
    (subtotal, appliedCoupon, shipping) => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon === 'SAVE10' && subtotal > 100) return subtotal * 0.1;
        if (appliedCoupon === 'SAVE20' && subtotal > 200) return subtotal * 0.2;
        if (appliedCoupon === 'FREESHIP') return shipping;
        return 0;
    }
);

export const selectTotal = createSelector(
    [selectSubtotal, selectTax, selectShipping, selectDiscount],
    (subtotal, tax, shipping, discount) => subtotal + tax + shipping - discount
);

export default cartSlice.reducer;
