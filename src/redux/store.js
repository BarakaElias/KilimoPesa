import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import surveySlice from "./slices/survey";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    surveySlice: surveySlice,
  },
});
