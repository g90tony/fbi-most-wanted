import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storageSession from "redux-persist/lib/storage/session";

import { persistReducer, persistStore } from "redux-persist";
import { authStateSlice } from "./slices/authStateSlice";

const combinedReducers = combineReducers({
  [authStateSlice.name]: authStateSlice.reducer,
});

const persistConfig = {
  key: "rootAdminStore",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
