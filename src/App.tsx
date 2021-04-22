import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJokes } from "./API";
import {
  AppState,
  categories,
  categoryOptionUpdated,
  dataFetched,
  searchSubmitted,
} from "./appSlice";
import { JokeList } from "./JokeList";
import styled from "styled-components";
import { Selector } from "./Selector";
import { SearchForm } from "./SearchForm";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const dispatch = useDispatch();
  const state = useSelector(selectState);

  useEffect(() => {
    const getJokesData = async (search: string) => {
      const jokesData = await getJokes(search);
      dispatch(dataFetched({ data: jokesData }));
      console.log(jokesData);
    };
    getJokesData(state.search);
  }, [dispatch, state.search]);

  // compute filtered list which is only rendered when the category "Any" is active
  const filteredList = state.data?.jokes.filter(
    (joke) => joke.category === state.category
  );

  return (
    <Container>
      <Selector
        selectedCategory={categories}
        value={state.category}
        onChange={(category) =>
          dispatch(categoryOptionUpdated({ selectedCategory: category }))
        }
      />
      <SearchForm
        submit={(text) => dispatch(searchSubmitted({ text: text }))}
      />
      {state.data && state.category !== "Any" ? (
        filteredList?.length !== 0 ? (
          <JokeList jokes={filteredList} />
        ) : (
          "No jokes from this category"
        )
      ) : (
        <JokeList jokes={state.data?.jokes} />
      )}
    </Container>
  );
}

const selectState = ({ state }: { state: AppState }) => state;

export default App;
