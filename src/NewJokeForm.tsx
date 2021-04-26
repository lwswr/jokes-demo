import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { categories, Categories } from "./appSlice";
import { CategorySelector } from "./CategorySelector";
import { debounce } from "throttle-debounce";
import { PostSingleJoke, PostTwoPartJoke } from "./API";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectorField = styled.select`
  width: 70%;
  height: 40px;
  font-family: "Nunito", sans-serif;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  transition: 0.4s;
  margin: 1rem 0;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

const TextInput = styled.input`
  height: 35px;
  width: 68%;
  font-family: "Nunito", sans-serif;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  transition: 0.4s;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-size: 1rem;
  font-family: "Nunito", sans-serif;
  border: none;
  border-radius: 0.5rem;
  background: #1757a0;
  width: 6rem;
  height: 2rem;
  text-decoration: none;
  padding: 0.25rem;
  color: white;
  transition: 0.3s;
  align-self: flex-end;
  letter-spacing: 1px;
  margin-top: 1rem;
  :hover {
    background: #114177;
  }
`;

const SetupInput = styled.input`
  height: 35px;
  width: 68%;
  font-family: "Nunito", sans-serif;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  transition: 0.4s;
  margin-bottom: 1rem;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  :focus {
    outline: none;
  }
`;

export type SingleJokeSubmitProps = {
  jokeType: "single";
  category: Categories;
  joke: string;
};

export type TwoPartJokeSubmitProps = {
  jokeType: "twopart";
  category: Categories;
  setup: string;
  delivery: string;
};

export const NewJokeForm = ({
  submitJoke,
}: {
  submitJoke: (newJoke: PostSingleJoke | PostTwoPartJoke) => void;
}) => {
  // local state
  const [jokeType, setJokeType] = useState<"single" | "twopart">("single");
  const [joke, setJoke] = useState<string>("");
  const [category, setCategory] = useState<Categories>("Any");
  const [setup, setSetup] = useState<string>("");
  const [delivery, setDelivery] = useState<string>("");

  const onSubmit = useCallback(() => {
    // basic validation stops category "Any" being entered
    if (category === "Any") {
      alert("Please choose a category");
      return null;
    }
    // formatting the inputted values with the hard coded ones
    if (jokeType === "single") {
      submitJoke({
        formatVersion: 3,
        category: category,
        type: jokeType,
        joke: joke,
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
      });
    } else if (jokeType === "twopart") {
      submitJoke({
        formatVersion: 3,
        category: category,
        type: jokeType,
        setup: setup,
        delivery: delivery,
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
      });
    }
  }, [category, delivery, joke, jokeType, setup, submitJoke]);

  // optimising to prevent spamming of the submit button
  const debounced = useMemo(() => debounce(1000, onSubmit), [onSubmit]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        debounced();
      }}
      data-testid="newJokeForm"
    >
      <div style={{ marginBottom: "1rem" }}>Submit your own joke!</div>
      <Row>
        <CategorySelector
          categories={categories}
          value={category}
          onChange={(category) => {
            setCategory(category);
          }}
        />
      </Row>
      <Row>
        <label style={{ fontSize: "13px" }}>Joke Type</label>
        <SelectorField
          onChange={(e) => setJokeType(e.target.value as any)}
          required
        >
          <option value="single">Single</option>
          <option value="twopart">Two Part</option>
        </SelectorField>
      </Row>
      {jokeType === "single" ? (
        <div>
          <Row>
            <label style={{ fontSize: "13px" }}>Joke</label>
            <TextInput
              type="text"
              value={joke}
              onChange={(e) => {
                setJoke(e.target.value);
              }}
              data-testid={"jokeTextField"}
              required
            />
          </Row>
        </div>
      ) : (
        <div>
          <Row>
            <label style={{ fontSize: "13px" }}>Setup</label>
            <SetupInput
              type="text"
              value={setup}
              onChange={(e) => {
                setSetup(e.target.value);
              }}
              required
            />
          </Row>
          <Row>
            <label style={{ fontSize: "13px" }}>Delivery</label>
            <SetupInput
              type="text"
              value={delivery}
              onChange={(e) => {
                setDelivery(e.target.value);
              }}
              required
            />
          </Row>
        </div>
      )}
      <Button type="submit" data-testid={"jokeSubmitButton"}>
        Submit
      </Button>
    </Form>
  );
};
