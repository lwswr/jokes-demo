import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

describe("App", () => {
  it("sucessfully renders App", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Submit your own joke!/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("renders ten jokes", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect((await screen.findAllByTestId("jokeListItem")).length).toBe(10);
  });
});
