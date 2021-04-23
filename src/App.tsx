import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfo,
  getJokes,
  postNewJoke,
  PostSingleJoke,
  PostTwoPartJoke,
} from "./API";
import {
  AppState,
  Categories,
  categorySubmitted,
  clearButtonClicked,
  dataFetched,
  infoDataFetched,
  jokePosted,
  newJokeSubmitted,
  searchTextUpdated,
} from "./appSlice";
import { JokeList } from "./JokeList";
import styled from "styled-components";
import { SearchForm } from "./SearchForm";
import { NewJokeForm } from "./NewJokeForm";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UpperLeftColumn = styled.div`
  position: fixed;
  top: 3.5%;
  left: 2.5%;
  width: 18%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  padding: 20px;
`;

const LowerLeftColumn = styled.div`
  position: fixed;
  top: 40%;
  left: 2.5%;
  width: 18%;
  height: 40%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  padding: 20px;
`;

function App() {
  const dispatch = useDispatch();
  const state = useSelector(selectState);

  // one call on first render fetches the information
  useEffect(() => {
    const getInfoData = async () => {
      try {
        const infoData = await getInfo();
        dispatch(infoDataFetched({ info: infoData }));
      } catch (error) {
        console.log(error);
      }
    };
    getInfoData();
  }, [dispatch]);

  // fetch from api when category or search is updated and category changes
  useEffect(() => {
    const getJokesData = async (search: string, category: Categories) => {
      try {
        const jokesData = await getJokes(search, category);
        dispatch(dataFetched({ data: jokesData }));
        console.log(jokesData);
      } catch (error) {
        console.log(error);
      }
    };
    getJokesData(state.search, state.category);
  }, [dispatch, state.search, state.category]);

  useEffect(() => {
    const postJoke = async (newJoke?: PostSingleJoke | PostTwoPartJoke) => {
      try {
        const res = await postNewJoke(newJoke);
        dispatch(jokePosted({ postResponse: res }));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    postJoke(state.newJoke);
  });

  // calc sum of safejokes
  const safeJokesCount = state.info?.jokes.safeJokes.reduce(
    (accum, item) => accum + item.count,
    0
  );

  return (
    <Container>
      <UpperLeftColumn>
        <div>
          There are a total of {state.info?.jokes.totalCount} jokes to browse,
          however seeing as you are in safe mode you can access {safeJokesCount}
          .
        </div>
        <SearchForm
          submit={(category) =>
            dispatch(categorySubmitted({ category: category }))
          }
          onChange={(text) => {
            dispatch(searchTextUpdated({ text: text }));
          }}
          onClick={() => {
            dispatch(clearButtonClicked());
          }}
        />
        <div>
          Displaying {state.data?.jokes ? state.data?.jokes.length : "0"}{" "}
          results
          {state.search !== "" ? <span> for "{state.search}"</span> : null} in "
          {state.category}"
        </div>
      </UpperLeftColumn>
      <LowerLeftColumn>
        <NewJokeForm
          submitJoke={(newJoke) => {
            dispatch(newJokeSubmitted({ newJoke: newJoke }));
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          {state.postJokeResponse?.message}
        </div>
      </LowerLeftColumn>

      {/* Conditionally render the lsit of jokes based on whether the list is being filtered */}
      {state.data?.jokes ? <JokeList jokes={state.data.jokes} /> : null}
    </Container>
  );
}

const selectState = ({ state }: { state: AppState }) => state;

export default App;
