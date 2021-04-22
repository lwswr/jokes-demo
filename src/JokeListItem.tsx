import * as React from "react";
import styled from "styled-components";
import { Joke } from "./API";

const JokeItemContainer = styled.div`
  background: #d6d6d6;
  color: black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Answer = styled.div`
  margin-top: 0.5rem;
  font-style: italic;
`;

const Setup = styled.div``;

const Category = styled.div``;

export const JokeListItem = ({ joke }: { joke: Joke }) => {
  return (
    <JokeItemContainer>
      {joke.type === "single" ? (
        <SingleJoke joke={joke} />
      ) : (
        <TwoPartJoke joke={joke} />
      )}
    </JokeItemContainer>
  );
};

export const TwoPartJoke = ({ joke }: { joke: Joke }) => {
  return (
    <JokeItemContainer>
      <Setup>{joke.setup}</Setup>
      <Answer>{joke.delivery}</Answer>
      <Category>{joke.category}</Category>
    </JokeItemContainer>
  );
};

export const SingleJoke = ({ joke }: { joke: Joke }) => {
  return (
    <JokeItemContainer>
      <Setup>{joke.joke}</Setup>
      <Category>{joke.category}</Category>
    </JokeItemContainer>
  );
};
