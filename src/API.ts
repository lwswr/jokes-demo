import axios from "axios";
import { Categories } from "./appSlice";

export type DataResponse = {
  error: boolean;
  amount: number;
  jokes: Joke[];
};

export type Joke = {
  category: string;
  delivery: string;
  flags: {
    explicit: boolean;
    nsfw: boolean;
    political: boolean;
    racist: boolean;
    religious: boolean;
    sexist: boolean;
  };
  id: number;
  joke: string;
  lang: string;
  safe: boolean;
  type: "single" | "twopart";
  setup: string;
};

export type SafeJokesCount = {
  lang: string;
  count: number;
};

type JokeStyleType = "single" | "twopart";

export type Info = {
  error: boolean;
  version: string;
  jokes: {
    totalCount: number;
    categories: string[];
    flags: string[];
    types: JokeStyleType;
    submissionURL: string;
    idRange: {
      cs: number[];
      de: number[];
      es: number[];
      fr: number[];
      en: number[];
      pt: number[];
    };
    safeJokes: SafeJokesCount[];
  };
  formats: string[];
  jokeLanguages: number;
  systemLanguages: number;
  info: string;
  timestamp: Date;
};

export type PostSingleJoke = {
  formatVersion: number;
  category: Categories;
  type: "single";
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: "en";
  safe: true;
};

export type PostTwoPartJoke = {
  formatVersion: number;
  category: Categories;
  type: "twopart";
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: "en";
  safe: true;
};

export type PostJokeResponse = {
  error: boolean;
  message: string;
  submission: PostSingleJoke | PostTwoPartJoke;
  timestamp: number;
};

export const postJoke = async (joke: PostSingleJoke | PostTwoPartJoke) => {
  return axios
    .post<PostJokeResponse>("https://v2.jokeapi.dev/submit", joke)
    .then((res) => res.data);
};

export const getJokes = async (search: string, category: Categories) => {
  const resultsAmount: number = 10;
  return axios
    .get<DataResponse>(
      `https://v2.jokeapi.dev/joke/${category}?contains=${search}&amount=${resultsAmount}&safe-mode`
    )
    .then((res) => res.data);
};

export const getInfo = async () => {
  return axios.get<Info>(`https://v2.jokeapi.dev/info`).then((res) => res.data);
};
