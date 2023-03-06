import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import useAppSelector from "../../../../hooks/useAppSelector";
import SurveyQuestions from "./../SurveyQuestions";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import {
  decreaseStep,
  increaseStep,
  setIsPracticing,
  setPracticed,
} from "../../../../redux/slices/survey";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PracticingQuestions from "./PracticingQuestions";

const PracticingQuestionsForm = ({ setCurrentState }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isPracticing = useAppSelector(
    (state) => state.surveySlice.isPracticing
  );
  console.log("Are they practicing: ", isPracticing);
  const final_values = useAppSelector((state) => state.surveySlice);

  return (
    <Formik
      initialValues={{
        agricultural_fields: final_values.practiced_agriculture,
        challenges: "",
        is_practicing: isPracticing,
      }}
      validationSchema={Yup.object().shape({
        agricultural_fields: Yup.mixed().when("is_practicing", {
          is: "yes",
          then: Yup.array()
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
        }),
        challenges: Yup.mixed().when("is_practicing", {
          is: "yes",
          then: Yup.string(),
        }),
      })}
      onSubmit={async (values, { setErrors, setSubmitting, setStatus }) => {
        try {
          console.log("Survey questions values: ", values);
          dispatch(setIsPracticing(values.is_practicing));
          dispatch(setPracticed(values));
          dispatch(increaseStep());
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
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {console.log("Current values: ", values)}
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}
          {/* <div>Are you currently doing any form of Agriculture?</div> */}
          <div className="d-flex flex-row justify-content-center">
            <Form.Group>
              <Form.Check
                className="m-5"
                name="is_practicing"
                type="radio"
                value="no"
                onBlur={handleBlur}
                onChange={handleChange}
                label={t("No")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                className="m-5"
                name="is_practicing"
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                value="yes"
                label={t("Yes")}
              />
            </Form.Group>
          </div>
          {console.log("Is practicing: ", typeof values.is_practicing)}
          {values.is_practicing === "yes" ? (
            <PracticingQuestions
              isPracticing={isPracticing}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
            />
          ) : null}

          <div className="d-flex flex-row justify-content-end">
            <Button
              onClick={() => dispatch(decreaseStep())}
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

export default PracticingQuestionsForm;
