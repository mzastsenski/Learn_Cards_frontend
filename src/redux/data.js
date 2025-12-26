import { createSlice } from "@reduxjs/toolkit";
import { defaultCards } from "../data/defaultCards";
import { postLogout } from "../requests";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    renderedCards: [],
    menuOpened: false,
    user: localStorage.getItem("user"),
    collection: "Collection",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCards: (state, action) => {
      state.renderedCards = action.payload;
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
      state.collection = "Collection";
      state.data = defaultCards;
      state.renderedCards = defaultCards;
      postLogout();
    },
  },
});

export const { setData, setCards, setUser, setCollection, setOpened, logout } =
  dataSlice.actions;

export default dataSlice.reducer;
