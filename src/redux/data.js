import { createSlice } from "@reduxjs/toolkit";
import { defaultCards } from "../data/defaultCards";
import { postLogout } from "../requests";
import { getData } from "../requests";

const endSession = (state) => {
  localStorage.setItem("user", "");
  state.user = "";
  state.collection = "Collection";
  state.data = defaultCards;
  state.renderedCards = defaultCards;
  postLogout();
};

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
    setDefault: (state) => {
      state.data = defaultCards;
      state.renderedCards = defaultCards;
      state.collection = "Collection";
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
      endSession(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        const cards = data.filter((e) => e.collection === state.collection);
        if (cards[0]) state.renderedCards = data;
        else {
          const arr = [];
          data.forEach((e) => {
            if (!arr.includes(e.collection)) arr.push(e.collection);
          });
          if (arr[0]) {
            const newCollecton = arr[0];
            const cards = data.filter((e) => e.collection === newCollecton);
            state.collection = newCollecton;
            state.renderedCards = cards;
          }
        }
      })
      .addCase(getData.rejected, (state, action) => {
        endSession(state);
      });
  },
});

export const {
  setData,
  setCards,
  setDefault,
  setUser,
  setCollection,
  setOpened,
  logout,
} = dataSlice.actions;

export default dataSlice.reducer;
