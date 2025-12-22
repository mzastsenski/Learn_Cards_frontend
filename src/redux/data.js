import { createSlice } from "@reduxjs/toolkit";
import { postLogout } from "../requests";
import { words } from "../data/defaultCards";

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
    logout: (state) => {
      localStorage.setItem("user", "");
      state.user = "";
      state.data = words;
      state.collection = "Collection";
      postLogout();
    },
  },
});

export const { setData, setCards, setUser, setCollection, setOpened, logout } =
  dataSlice.actions;

export default dataSlice.reducer;
