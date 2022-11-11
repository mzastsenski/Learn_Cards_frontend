import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    renderCards: [],
    user: localStorage.getItem("user"),
    collection: "Collection",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCards: (state, action) => {
      state.renderCards = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
  },
});

export const { setData, setCards, setUser, setCollection } = dataSlice.actions;

export default dataSlice.reducer;
