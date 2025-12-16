import { configureStore, combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import hostelReducer from "./slices/hostelSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";

/* ================== ROOT REDUCER ================== */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  session: sessionReducer,
  counter: counterReducer,
  hostel: hostelReducer,
});

/* ================== STORE ================== */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // clean & safe
    }),
});

export default store;