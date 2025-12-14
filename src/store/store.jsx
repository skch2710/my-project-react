import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import counterReducer from "./slices/counterSlice";
import hostelReducer from "./slices/hostelSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";

import { injectStore } from "../utils/axiosHelper";

/* ======================================
   ROOT REDUCER
====================================== */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  session: sessionReducer,
  counter: counterReducer,
  hostel: hostelReducer,
});

/* ======================================
   REDUX PERSIST CONFIG
====================================== */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
};

/* ======================================
   PERSISTED REDUCER
====================================== */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ======================================
   STORE CREATION
====================================== */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

/* ======================================
   INJECT STORE INTO AXIOS
====================================== */
injectStore(store);

/* ======================================
   EXPORTS
====================================== */
export const persistor = persistStore(store);
export default store;
