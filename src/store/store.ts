import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers, Reducer } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import projectReducer from "./reducer/projectReducer";
import taskReducer from "./reducer/taskReducer";
import themeReducer from "./reducer/themeReducer";
import userReducer from "./reducer/userReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const persistConfig = {
  key: "root",
  storage,
};

const allReducer: Reducer = combineReducers({
  taskReducer: taskReducer,
  userReducer: userReducer,
  projectReducer: projectReducer,
  themeReducer: themeReducer,
});
const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getMiddleware) =>
    getMiddleware(customizedMiddleware).concat(thunk),
});
export const persistor = persistStore(store);

// Defining the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Defining the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Defining a custom hook for accessing dispatch function
// This hook provides the AppDispatch type to useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
