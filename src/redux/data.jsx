import { createSlice } from "@reduxjs/toolkit";
import { postLogout } from "../Ajax";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    renderCards: [],
    menuOpened: false,
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
    setOpened: (state, action) => {
      state.menuOpened = action.payload;
    },
    logout: (state, action) => {
      state.user = "";
      localStorage.setItem("user", "");
      postLogout();
      alert("You are not logged in");
    },
  },
});

export const { setData, setCards, setUser, setCollection, setOpened, logout } =
  dataSlice.actions;

export default dataSlice.reducer;
