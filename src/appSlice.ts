import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataResponse } from "./API";

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
  category: Categories;
  search: string;
};

const initialState: AppState = {
  data: undefined,
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
    categoryOptionUpdated: (
      state,
      { payload }: PayloadAction<{ selectedCategory: Categories }>
    ) => {
      state.category = payload.selectedCategory;
    },
    searchSubmitted: (state, { payload }: PayloadAction<{ text: string }>) => {
      state.search = payload.text;
    },
  },
});

export const {
  dataFetched,
  categoryOptionUpdated,
  searchSubmitted,
} = appSlice.actions;

export default appSlice.reducer;
