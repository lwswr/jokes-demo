import * as React from "react";

export const SearchForm = ({ submit }: { submit: (text: string) => void }) => {
  const [text, setText] = React.useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(text);
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
