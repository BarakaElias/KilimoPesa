import React, { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import SurveyQuestionsForm from "./SurveyQuestionsForm";
import useAppSelector from "./../../../hooks/useAppSelector";
import PersonalInformationForm from "./PersonalInformationForm";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  increaseStep,
  decreaseStep,
  setIsPracticing,
} from "../../../redux/slices/survey";
import { Helmet } from "react-helmet-async";
import StepLocation from "./StepLocation";
import PracticingQuestionsForm from "./practicing/PracticingQuestionsForm";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import LanguageSwitch from "../../../ui/language/LanguageSwitch";
const Survey = () => {
  const { t } = useTranslation();
  const step = useAppSelector((state) => state.surveySlice.step);
  const isPracticing = true;
  const dispatch = useAppDispatch();
  console.log("Step value: ", step);
  const PracticingForm = () => {
    return (
      <div className="slide-in-right">
        <h1 className="text-center">
          {t("Are you currently doing any form of Agriculture?")}
        </h1>
        {/* <div className="d-flex flex-row justify-content-center">
          <Form.Group>
            <Field
              type="radio"
              component={<Form.Check />}
              name="isPracticing"
            ></Field>
          </Form.Group>
        </div> */}
        {isPracticing ? <PracticingQuestionsForm /> : null}
        <div className="d-flex flex-row justify-content-end">
          {isPracticing ? null : (
            <Button
              variant="outline-primary"
              onClick={() => {
                dispatch(decreaseStep());
              }}
              className="ps-5 pe-5 pt-2 pb-2"
            >
              Back
            </Button>
          )}
          {/* {
            <Button
              variant="primary"
              onClick={() => {
                dispatch(increaseStep());
              }}
              className="ps-5 pe-5 pt-2 pb-2"
            >
              Continue
            </Button>
          } */}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Helmet title="Survey Form" />
      <section className="bg-white pb-3">
        <div className="d-flex flex-column align-items-end">
          <LanguageSwitch />
        </div>
        <Container>
          <h1 className="kilimo-title-1 text-center pt-5">
            Kilimo Pesa Survey Form
          </h1>
          <p className="kilimo-description ps-5 pe-5 text-center fst-italic">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
          <Card>
            <Card.Header>
              <StepLocation />
            </Card.Header>
            <Card.Body>
              {step === 1 ? <PersonalInformationForm /> : null}
              {step === 2 ? <PracticingForm /> : null}
              {step === 3 ? <SurveyQuestionsForm /> : null}
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default Survey;
