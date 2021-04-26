import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfo,
  getJokes,
  postJoke,
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
  searchTextUpdated,
} from "./appSlice";
import { JokeList } from "./JokeList";
import styled from "styled-components";
import { SearchForm } from "./SearchForm";
import { NewJokeForm } from "./NewJokeForm";

document.title = "Jokes Demo";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #e9e9e9;
  @media only screen and (max-device-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const JokeSearchContainer = styled.div`
  position: fixed;
  background: white;
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
  @media only screen and (max-device-width: 768px) {
    width: 80%;
    top: 0;
    left: 0;
    position: relative;
    margin: 1rem 0;
    height: 300px;
  }
`;

const SubmitJokeContainer = styled.div`
  position: fixed;
  background: white;
  top: 40%;
  left: 2.5%;
  width: 18%;
  height: 45%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 0.5rem;
  padding: 20px;
  @media only screen and (max-device-width: 768px) {
    top: 0;
    left: 0;
    width: 80%;
    position: relative;
  }
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

  const postNewJokeToAPI = async (joke: PostSingleJoke | PostTwoPartJoke) => {
    try {
      const res = await postJoke(joke);
      dispatch(jokePosted({ postResponse: res }));
    } catch (error) {
      console.log(error);
    }
  };

  // calc sum of safejokes
  const safeJokesCount = state.info?.jokes.safeJokes.reduce(
    (accum, item) => accum + item.count,
    0
  );

  return (
    <Container>
      <JokeSearchContainer>
        <div style={{ fontSize: "15px" }}>
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
      </JokeSearchContainer>
      <SubmitJokeContainer>
        <NewJokeForm
          submitJoke={(newJoke) => {
            postNewJokeToAPI(newJoke);
          }}
        />
        <div style={{ marginTop: "1rem", fontSize: "15px" }}>
          {state.postJokeResponse?.message}
        </div>
      </SubmitJokeContainer>

      {/* Conditionally render the lsit of jokes based on whether the list is being filtered */}
      {state.data?.jokes ? <JokeList jokes={state.data.jokes} /> : null}
    </Container>
  );
}

const selectState = ({ state }: { state: AppState }) => state;

export default App;
