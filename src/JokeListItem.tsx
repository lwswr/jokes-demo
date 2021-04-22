import * as React from "react";
import styled from "styled-components";
import { Joke } from "./API";

const JokeItemContainer = styled.div`
  background: #d6d6d6;
  color: black;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Answer = styled.div`
  font-style: italic;
  margin-top: 1rem;
`;

const Setup = styled.div``;

const Category = styled.div`
  align-self: flex-end;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.2rem;
  margin-top: 1rem;
`;

export const JokeListItem = ({ joke }: { joke: Joke }) => {
  return (
    <div>
      {joke.type === "single" ? (
        <SingleJoke joke={joke} />
      ) : (
        <TwoPartJoke joke={joke} />
      )}
    </div>
  );
};

// Two seperate components to display the two styles of joke
export const TwoPartJoke = ({ joke }: { joke: Joke }) => {
  return (
    <JokeItemContainer>
      <Setup>{joke.setup}</Setup>
      <Answer> - {joke.delivery}</Answer>
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
