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
        state.value.itemCart.push({ ...payload, quantity: 1 });
      }

      state.value.total = state.value.itemCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.value.totalPrecioCarrito = state.value.itemCart.reduce(
        (acc, item) => acc + parseFloat(item.price || "0") * item.quantity,
        0
      );

      state.value.fecha = new Date().toLocaleString();
    },
    removeItem: (state, { payload }) => {
      state.value.itemCart = state.value.itemCart.filter(
        (item) => item.id !== payload.id
      );

      state.value.total = state.value.itemCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.value.totalPrecioCarrito = state.value.itemCart.reduce(
        (acc, item) => acc + parseFloat(item.precio || "0") * item.quantity,
        0
      );

      state.value.fecha = new Date().toLocaleString();
    },
    clearCart: (state) => {
      state.value.total = 0;
      state.value.itemCart = [];
      state.value.fecha = new Date().toLocaleString();
    },
  },
});

export const { addCartItem, removeItem, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
