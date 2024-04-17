import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers, Reducer } from "redux";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import tabReducer from "./reducer/tabReducer";
import taskReducer from "./reducer/taskReducer";
import userReducer from "./reducer/userReducer";
import themeReducer from "./reducer/themeReducer";
import projectReducer from "./reducer/projectReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const persistConfig = {
  key: "root",
  storage,
};

const allReducer: Reducer = combineReducers({
  tabReducer: tabReducer,
  taskReducer: taskReducer,
  userReducer: userReducer,
  themeReducer: themeReducer,
  projectReducer: projectReducer,
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
