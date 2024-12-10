import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { apiSlice } from "./apiSlice";


// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer
//     },
//     middleware: (getDefaultMiddleware) => {
//         return getDefaultMiddleware().concat(apiSlice.middleware)
//     }
// })

// export default store;

const rootReducer = combineReducers({ 
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth"
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register"],
        ignoredActionPaths: ["rehydrate", "register"],
        ignoredPaths: ["register"],
      },
    }).concat(apiSlice.middleware)
});

const persistor = persistStore(store);

export { store, persistor };



