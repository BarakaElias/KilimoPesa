import { createSlice } from "@reduxjs/toolkit";

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
    step: 2,
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

export const {
  increaseStep,
  decreaseStep,
  setIsPracticing,
  setPersonalInformation,
  setPracticed,
  setTheSurvey,
} = surveySlice.actions;
export default surveySlice.reducer;
