import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DataResponse,
  Info,
  PostJokeResponse,
  PostSingleJoke,
  PostTwoPartJoke,
} from "./API";
import {
  SingleJokeSubmitProps,
  TwoPartJokeSubmitProps,
} from "./NewJokeForm";

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

// create state structure type
export type AppState = {
  data?: DataResponse;
  info?: Info;
  category: Categories;
  search: string;
  newJoke?: PostSingleJoke | PostTwoPartJoke;
  postJokeResponse?: PostJokeResponse;
};

// initialise state structure
const initialState: AppState = {
  data: undefined,
  info: undefined,
  category: "Any",
  search: "",
  newJoke: undefined,
  postJokeResponse: undefined,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    // reducer functions actions named as events rather than commands
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
    newJokeSubmitted: (
      state,
      {
        payload,
      }: PayloadAction<{
        newJoke: SingleJokeSubmitProps | TwoPartJokeSubmitProps;
      }>
    ) => {
      if (payload.newJoke.category === "Any") {
        alert("Please choose a category");
        return state;
      }
      // if statement to assign vairables to correct data structure depending on joke type
      console.log("Waited for one second");
      if (payload.newJoke.jokeType === "single") {
        state.newJoke = {
          formatVersion: 3,
          category: payload.newJoke.category,
          type: payload.newJoke.jokeType,
          joke: payload.newJoke.joke,
          flags: {
            nsfw: false,
            religious: false,
            political: false,
            racist: false,
            sexist: false,
            explicit: false,
          },
          lang: "en",
          safe: true,
        };
      } else if (payload.newJoke.jokeType === "twopart") {
        state.newJoke = {
          formatVersion: 3,
          category: payload.newJoke.category,
          type: payload.newJoke.jokeType,
          setup: payload.newJoke.setup,
          delivery: payload.newJoke.delivery,
          flags: {
            nsfw: false,
            religious: false,
            political: false,
            racist: false,
            sexist: false,
            explicit: false,
          },
          lang: "en",
          safe: true,
        };
      }
    },
    jokePosted: (
      state,
      { payload }: PayloadAction<{ postResponse: PostJokeResponse }>
    ) => {
      state.postJokeResponse = payload.postResponse;
    },
  },
});

// export the slice's reducer functions by destructurnng the reducers object
export const {
  dataFetched,
  infoDataFetched,
  categorySubmitted,
  searchTextUpdated,
  clearButtonClicked,
  newJokeSubmitted,
  jokePosted,
} = appSlice.actions;

export default appSlice.reducer;
