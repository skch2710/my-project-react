import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { encryptor } from "./encryptTransform";

import counterReducer from "./slices/counterSlice";
import hostelReducer from "./slices/hostelSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";

import { setupAxiosInterceptors } from "../utils/axiosClient";

/* ROOT REDUCER */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  session: sessionReducer,
  counter: counterReducer,
  hostel: hostelReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* STORE */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// 🔥 Inject store into Axios AFTER creation
setupAxiosInterceptors(store);

export const persistor = persistStore(store);
export default store;