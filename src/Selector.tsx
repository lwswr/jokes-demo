import * as React from "react";
import { categories, Categories } from "./appSlice";

export const Selector = ({
  selectedCategory,
  value,
  onChange,
}: {
  selectedCategory: Readonly<Categories[]>;
  value: Categories;
  onChange: (category: Categories) => void;
}) => {
  return (
    <div>
      <select
        value={value ?? selectedCategory}
        onChange={(e) => onChange(e.target.value as any)}
      >
        {categories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};
