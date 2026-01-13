import { createSlice } from "@reduxjs/toolkit";

export const DueloSlice = createSlice({
  name: "duelo",
  initialState: {
    value: {
      setCategorySelected: "",
      setIdSelected: "",
    },
  },
  reducers: {
    setCategorySelectedDuelo: (state, { payload }) => {
      state.value.setCategorySelected = payload;
    },
    setIdSelectedDuelo: (state, { payload }) => {
      state.value.setIdSelected = payload;
    },
  },
});

export const { setCategorySelectedDuelo, setIdSelectedDuelo } =
  DueloSlice.actions;
export default DueloSlice.reducer;
