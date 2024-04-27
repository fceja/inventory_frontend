import { configureStore } from "@reduxjs/toolkit";

import { checkTokenExpiryMiddleware } from "@store/middleware/AuthMidW";
import rootReducer from "@store/RootReducer";

const savedState = localStorage.getItem('reduxState');
const preloadedState = savedState ? JSON.parse(savedState) : {}

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpiryMiddleware),
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
