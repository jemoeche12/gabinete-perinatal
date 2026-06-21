import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentProvider: "stripe",
  country: null,
  providerLoaded: false,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPaymentProvider: (state, { payload }) => {
      state.paymentProvider = payload.provider;
      state.country = payload.country;
      state.providerLoaded = true;
    },
    resetPaymentProvider: (state) => {
        state.paymentProvider = "stripe";
        state.country = null;
        state.providerLoaded = false;

    }
  },
});

export const { setPaymentProvider, resetPaymentProvider } = appSlice.actions;
export default appSlice.reducer;
