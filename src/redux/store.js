import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import authSlice from "./slices/authSlice";
import surveySlice from "./slices/survey";

//API
import { surveyApi } from "./slices/survey";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    surveySlice: surveySlice,
    [surveyApi.reducerPath]: surveyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([surveyApi.middleware]),
});
setupListeners(store.dispatch);
