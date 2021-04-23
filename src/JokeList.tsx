import * as React from "react";
import { Joke } from "./API";
import { JokeListItem } from "./JokeListItem";
import styled from "styled-components";

const JokeListContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  @media only screen and (max-device-width: 768px) {
    width: 91%;
    position: relative;
  }
`;

export const JokeList = ({ jokes }: { jokes?: Joke[] }) => {
  return (
    <JokeListContainer>
      {jokes?.map((joke) => {
        return <JokeListItem key={joke.id} joke={joke} />;
      })}
    </JokeListContainer>
  );
};
