import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { throttle } from "throttle-debounce";
import { AppState, Categories, categories } from "./appSlice";
import { CategorySelector } from "./CategorySelector";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  :hover {
    background: #114177;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchForm = ({
  submit,
  onChange,
  onClick,
}: {
  submit: (category: Categories) => void;
  onChange: (text: string) => void;
  onClick: () => void;
}) => {
  const { search } = useSelector(selectState);
  const [category, setCategory] = React.useState<Categories>("Any");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const debounced = useMemo(() => {
    return throttle(333, handleChange);
  }, [handleChange]);

  return (
    <Form>
      <CategorySelector
        categories={categories}
        value={category}
        onChange={(category) => {
          submit(category);
          setCategory(category);
        }}
      />
      <Row>
        <label style={{ fontSize: "13px" }}>Keyword(s)</label>
        <TextInput type="text" value={search} onChange={(e) => debounced(e)} />
      </Row>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setCategory("Any");
          onClick();
        }}
      >
        Clear
      </Button>
    </Form>
  );
};

const selectState = ({ state }: { state: AppState }) => state;
