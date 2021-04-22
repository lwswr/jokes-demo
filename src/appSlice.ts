import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataResponse, Info } from "./API";

// don't require "Dark" category as running API calls in safe mode
export const categories = [
  "Any",
  "Misc",
  "Programming",
  "Pun",
  "Spooky",
  "Christmas",
] as const;
export type Categories = typeof categories[number];

export type AppState = {
  data?: DataResponse;
  info?: Info;
  category: Categories;
  search: string;
};

const initialState: AppState = {
  data: undefined,
  info: undefined,
  category: "Any",
  search: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    dataFetched: (
      state,
      { payload }: PayloadAction<{ data: DataResponse }>
    ) => {
      state.data = payload.data;
    },
    infoDataFetched: (state, { payload }: PayloadAction<{ info: Info }>) => {
      state.info = payload.info;
    },
    categorySubmitted: (
      state,
      { payload }: PayloadAction<{ category: Categories }>
    ) => {
      state.category = payload.category;
    },
    searchTextUpdated: (
      state,
      { payload }: PayloadAction<{ text: string }>
    ) => {
      state.search = payload.text;
    },
    clearButtonClicked: (state) => {
      state.search = "";
      state.category = "Any";
    },
  },
});

export const {
  dataFetched,
  infoDataFetched,
  categorySubmitted,
  searchTextUpdated,
  clearButtonClicked,
} = appSlice.actions;

export default appSlice.reducer;
