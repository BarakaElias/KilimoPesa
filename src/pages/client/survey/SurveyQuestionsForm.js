import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import useAppSelector from "../../../hooks/useAppSelector";
import SurveyQuestions from "./SurveyQuestions";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setTheSurvey, decreaseStep } from "../../../redux/slices/survey";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SurveyQuestionsForm = ({ setCurrentState }) => {
  const { t } = useTranslation();
  const data = useAppSelector(
    (state) => state.surveySlice.the_survey.agricultural_fields
  );
  console.log("Survey data: ", data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isPracticing = useAppSelector(
    (state) => state.surveySlice.isPracticing
  );
  const final_values = useAppSelector((state) => state.surveySlice);

  return (
    <Formik
      initialValues={{
        agricultural_fields: data,
      }}
      validationSchema={Yup.object().shape({
        agricultural_fields: Yup.array()
          .of(
            Yup.object().shape({
              field: Yup.string().required("fffff"),
              categories: Yup.array()
                .min(1, "Must select at least one category")
                .required("Categories are required"),
              activities: Yup.array()
                .of(
                  Yup.object().shape({
                    activity: Yup.array().min(
                      1,
                      "Please select at least one activity"
                    ),
                    region: Yup.string().required(
                      "The region you practice this activity is required"
                    ),
                  })
                )
                .min(1, "Please select at least one activity")
                .required("Select at least one activity"),
            })
          )
          .min(1, "Must choose at least one field"),
      })}
      onSubmit={async (values, { setErrors, setSubmitting, setStatus }) => {
        try {
          console.log("Survey questions values: ", values);
          dispatch(setTheSurvey(values));
          navigate("/summary");

          //submit to the server

          console.log("Submittion values: ", final_values);
        } catch (err) {
          console.log("Individual Nomination Form Error", err);
          setStatus({ success: false });
          setErrors({ submit: "Something went wrong" });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {console.log("Survey current values: ", values)}
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}
          <SurveyQuestions
            isPracticing={isPracticing}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
          <div className="d-flex flex-row justify-content-end">
            <Button
              onClick={() => {
                dispatch(decreaseStep());
              }}
              className="m-2"
              variant="outline-primary"
            >
              {t("Previous")}
            </Button>
            <Button
              className="ps-5 pe-5 pt-2 pb-2 m-2"
              type="submit"
              variant="primary"
            >
              {t("Continue")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SurveyQuestionsForm;
