import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const store = configureStore({
  reducer: {
    state: appSlice,
  },
});

export default store;

export type AddDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
