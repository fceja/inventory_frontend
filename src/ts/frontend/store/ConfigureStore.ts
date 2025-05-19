import { configureStore } from "@reduxjs/toolkit";

import { checkTokenExpiryMiddleware } from "@store/middleware/AuthMidW";
import rootReducer from "@store/RootReducer";

let preloadedState = {};

try {
  const savedState = localStorage.getItem("reduxState");
  preloadedState = savedState ? JSON.parse(savedState) : {};
} catch (e) {
  console.warn("Could not access localStorage or parse reduxState:", e);
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpiryMiddleware),
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
