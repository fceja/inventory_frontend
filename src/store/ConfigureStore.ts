import { configureStore } from "@reduxjs/toolkit";

import { checkTokenExpiryMiddleware } from "@store/middleware/authMidW";
import rootReducer from "@store/RootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpiryMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
