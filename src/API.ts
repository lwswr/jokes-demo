import axios from "axios";

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

export const getJokes = async (search: string) => {
  const resultsAmount: number = 10;
  return axios
    .get<DataResponse>(
      `https://v2.jokeapi.dev/joke/Any?contains=${search}&amount=${resultsAmount}&safe-mode`
    )
    .then((res) => res.data);
};
