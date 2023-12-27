import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
// redux-persist 사용
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userSlice,
});

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});
