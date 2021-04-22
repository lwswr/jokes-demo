import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, getJokes, Joke } from "./API";
import {
  AppState,
  Categories,
  categorySubmitted,
  clearButtonClicked,
  dataFetched,
  infoDataFetched,
  searchTextUpdated,
} from "./appSlice";
import { JokeList } from "./JokeList";
import styled from "styled-components";
import { SearchForm } from "./SearchForm";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftColumn = styled.div`
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
      } catch (error) {
        console.log(error);
      }
    };
    getJokesData(state.search, state.category);
  }, [dispatch, state.search, state.category]);

  // compute filtered list which is only rendered when the category "Any" is active
  const filterList = (list: Joke[] | undefined, stateCategory: Categories) => {
    return list?.filter((joke) => joke.category === stateCategory);
  };

  // filter the results of the request by category
  const filteredList = state.data
    ? filterList(state.data?.jokes, state.category)
    : [];

  // calc sum of safejokes
  const safeJokesCount = state.info?.jokes.safeJokes.reduce(
    (accum, item) => accum + item.count,
    0
  );

  return (
    <Container>
      <LeftColumn>
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
      </LeftColumn>

      {/* Conditionally render the lsit of jokes based on whether the list is being filtered */}
      {state.data?.jokes && state.category === "Any" ? (
        <JokeList jokes={state.data.jokes} />
      ) : state.category !== "Any" ? (
        <JokeList jokes={filteredList} />
      ) : null}
    </Container>
  );
}

const selectState = ({ state }: { state: AppState }) => state;

export default App;
