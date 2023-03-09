import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const surveySlice = createSlice({
  name: "survey",
  initialState: {
    personal_information: {
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      email: "",
      address: {
        city: "",
        district: "",
        street: "",
      },
      education_level: "",
      employment_status: "",
      id_type: "nida",
      hasNHIF: null,
      id_number: "",
    },
    isPracticing: false,
    practiced_agriculture: [],
    agricultural_fields_practicing: [],
    the_survey: {
      agricultural_fields: [],
    },
    step: 1,
  },
  reducers: {
    setPersonalInformation: (state, payload) => {
      state.personal_information = payload.payload;
    },
    setIsPracticing: (state, payload) => {
      state.isPracticing = payload.payload;
    },
    setPracticed: (state, payload) => {
      state.practiced_agriculture = payload.payload["agricultural_fields"];
    },
    setTheSurvey: (state, payload) => {
      state.the_survey = payload.payload;
      console.log("The payload: ", payload.payload);
    },
    increaseStep: (state, payload) => {
      state.step += 1;
    },
    decreaseStep: (state, payload) => {
      state.step -= 1;
    },
  },
});

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Surveys"],
  endpoints: (builder) => ({
    getAllSurveys: builder.query({
      query: () => "surveys",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Surveys"],
    }),
  }),
});

export const {
  increaseStep,
  decreaseStep,
  setIsPracticing,
  setPersonalInformation,
  setPracticed,
  setTheSurvey,
} = surveySlice.actions;

export const { useGetAllSurveysQuery } = surveyApi;
export default surveySlice.reducer;
