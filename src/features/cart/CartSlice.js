import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "Invitado",
      fecha: new Date().toLocaleString(),
      total: 0,
      totalPrecioCarrito: 0,
      itemCart: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const { id } = payload;
      const productInCart = state.value.itemCart.find((item) => item.id === id);
      
      if (!productInCart) {
        const price = parseFloat(payload.price);
        if (isNaN(price) || price <= 0) {
          return;
        }
        state.value.itemCart.push({ 
          ...payload, 
          quantity: 1,
          price: price 
        });
      } else {
        productInCart.quantity += 1;
      }
      
      state.value.total = state.value.itemCart.length;
      state.value.totalPrecioCarrito = state.value.itemCart.reduce(
        (acc, item) => {
          const itemPrice = parseFloat(item.price);
          const validPrice = isNaN(itemPrice) ? 0 : itemPrice;
          return acc + validPrice * item.quantity;
        },
        0
      );
      state.value.totalPrecioCarrito = Math.round(state.value.totalPrecioCarrito * 100) / 100;
      state.value.fecha = new Date().toLocaleString();
    },
    
    removeItem: (state, { payload }) => {
      state.value.itemCart = state.value.itemCart.filter(
        (item) => item.id !== payload.id
      );
      
      state.value.total = state.value.itemCart.length;
      state.value.totalPrecioCarrito = state.value.itemCart.reduce(
        (acc, item) => {
          const itemPrice = parseFloat(item.price);
          const validPrice = isNaN(itemPrice) ? 0 : itemPrice;
          return acc + validPrice * item.quantity;
        },
        0
      );
      state.value.totalPrecioCarrito = Math.round(state.value.totalPrecioCarrito * 100) / 100;
      state.value.fecha = new Date().toLocaleString();
    },
    
    clearCart: (state) => {
      state.value.total = 0;
      state.value.totalPrecioCarrito = 0;
      state.value.itemCart = [];
      state.value.fecha = new Date().toLocaleString();
    },
  },
});

export const { addCartItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
