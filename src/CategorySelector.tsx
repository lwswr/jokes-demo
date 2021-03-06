import * as React from "react";
import styled from "styled-components";
import { Categories } from "./appSlice";

const SelectorContainer = styled.div`
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
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

export const CategorySelector = ({
  categories,
  value,
  onChange,
}: {
  categories: Readonly<Categories[]>;
  value: Categories;
  onChange: (category: Categories) => void;
}) => {
  return (
    <SelectorContainer>
      <label style={{ fontSize: "13px" }}>Category</label>
      <SelectorField
        value={value ?? categories}
        onChange={(e) => onChange(e.target.value as any)}
        data-testid={"categorySelector"}
      >
        {categories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </SelectorField>
    </SelectorContainer>
  );
};
