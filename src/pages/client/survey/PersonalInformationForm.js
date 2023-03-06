import React, { useState } from "react";
import { Form, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useAppDispatch from "./../../../hooks/useAppDispatch";
import useAppSelector from "./../../../hooks/useAppSelector";
import {
  increaseStep,
  setPersonalInformation,
} from "./../../../redux/slices/survey";
import { cities } from "../../../utils/cities";
import { useTranslation } from "react-i18next";

const PersonalInformationForm = ({ setCurrentState }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentValues = useAppSelector(
    (state) => state.surveySlice.personal_information
  );
  console.log("currenct values: ", currentValues);
  const AddressField = ({
    id_type,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
  }) => {
    return (
      <Row className="mb-5 mt-5">
        <Col md={12} sm={12}>
          <Form.Group className="mb-3{">
            <Form.Label>{t("Address")}</Form.Label>
            <br></br>
            <Row>
              <Col md={3} sm={12}>
                <Form.Label>{t("Region")}</Form.Label>
                <Field
                  as="select"
                  className="form-select"
                  // defaultValue={currentValues.address["region"]}
                  name="address['region']"
                >
                  <option value="">{t("Select a region")}</option>
                  {cities.map((c) => {
                    return (
                      <option key={c.city} value={c.city}>
                        {c.city}
                      </option>
                    );
                  })}
                </Field>
              </Col>
              {values.address["region"] ? (
                <Col md={3} sm={12}>
                  <Form.Label>{t("District")}</Form.Label>
                  <Field
                    as="select"
                    className="form-select"
                    defaultValue={currentValues.address["district"]}
                    name="address['district']"
                  >
                    <option value="">{t("Select a district")}</option>
                    {cities
                      .find((c) => c.city === values.address["region"])
                      .districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </Field>
                </Col>
              ) : null}
              {values.address["district"] ? (
                <Col md={3} sm={12}>
                  <Form.Label>{t("Ward")}</Form.Label>
                  <Field
                    className="form-control"
                    defaultValue={currentValues.address["ward"]}
                    name="address['ward']"
                  />
                </Col>
              ) : null}
              {values.address["district"] ? (
                <Col md={3} sm={12}>
                  <Form.Label>{t("Street")}</Form.Label>
                  <Field
                    className="form-control"
                    defaultValue={currentValues.address["street"]}
                    name="address['street']"
                  />
                </Col>
              ) : null}
            </Row>
          </Form.Group>
        </Col>
      </Row>
    );
  };
  const IdFormField = ({
    id_type,
    handleBlur,
    handleChange,
    touched,
    errors,
  }) => {
    switch (id_type) {
      case "nida":
        return (
          <Form.Group className="mb-3">
            <Form.Label>{t("Nida number")}</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              defaultValue={currentValues.id_number}
              name="id_number"
              isInvalid={Boolean(touched.id_number && errors.id_number)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.id_number && (
              <Form.Control.Feedback type="invalid">
                {errors.id_number}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      case "driver_license":
        return (
          <Form.Group className="mb-3">
            <Form.Label>{t("Driver's license")}</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              name="id_number"
              defaultValue={currentValues.id_number}
              isInvalid={Boolean(touched.id_number && errors.id_number)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.id_number && (
              <Form.Control.Feedback type="invalid">
                {errors.id_number}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      case "passport":
        return (
          <Form.Group className="mb-3">
            <Form.Label>{t("Passport number")}:</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              defaultValue={currentValues.id_number}
              name="id_number"
              isInvalid={Boolean(touched.id_number && errors.id_number)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.id_number && (
              <Form.Control.Feedback type="invalid">
                {errors.id_number}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      case "voters_id":
        return (
          <Form.Group className="mb-3">
            <Form.Label>{t("Voter's Identification number")}</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              defaultValue={currentValues.id_number}
              name="id_number"
              isInvalid={Boolean(touched.id_number && errors.id_number)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.id_number && (
              <Form.Control.Feedback type="invalid">
                {errors.id_number}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      case "nhif":
        return (
          <Form.Group className="mb-3">
            <Form.Label>NHIF number:</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              name="id_number"
              isInvalid={Boolean(touched.id_number && errors.id_number)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.id_number && (
              <Form.Control.Feedback type="invalid">
                {errors.id_number}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      default:
        return (
          <Alert className="my-3" variant="info">
            <div className="alert-message">Select identification type</div>
          </Alert>
        );
    }
  };
  return (
    <Formik
      initialValues={{
        first_name: currentValues.first_name,
        last_name: currentValues.last_name,
        gender: currentValues.gender,
        date_of_birth: currentValues.date_of_birth,
        phone_number: currentValues.phone_number,
        email: currentValues.email,
        address: {
          region: currentValues.address["region"],
          district: currentValues.address["district"],
          street: currentValues.address["street"],
        },
        education_level: currentValues.education_level,
        employment_status: currentValues.employment_status,
        id_type: currentValues.id_type,
        id_number: currentValues.id_number,
        hasNHIF: currentValues.hasNHIF,
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        gender: Yup.string().required("Gender is required"),
        date_of_birth: Yup.string().required("Date of birth is required"),
        phone_number: Yup.string().required("Phone number is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
        address: Yup.object().shape({
          region: Yup.string().required("Region is required"),
          district: Yup.string(),
          street: Yup.string(),
        }),
        hasNHIF: Yup.bool().required("This is required"),
        education_level: Yup.string().required("Education level is required"),
        employment_status: Yup.string().required(
          "Employment status is required"
        ),
        id_type: Yup.string().required("Must specify identification type"),
        id_number: Yup.mixed()
          .when("id_type", {
            is: "nida",
            then: Yup.string()
              .required("Nida number is required")
              .min(20, "Number is too short"),
          })
          .when("id_type", {
            is: "diver_license",
            then: Yup.string()
              .required("Driver's license number is required")
              .min(10, "Number is too short"),
          })
          .when("id_type", {
            is: "voters_id",
            then: Yup.string()
              .required("Voter's identification number is required")
              .min(10, "Number is too short"),
          })
          .when("id_type", {
            is: "nhif",
            then: Yup.string()
              .required("NHIF card number is required")
              .min(12, "Too short"),
          }),
      })}
      onSubmit={async (values, setErrors, setStatus, setSubmitting) => {
        try {
          console.log("Personal information: ", values);
          dispatch(setPersonalInformation(values));
          dispatch(increaseStep());
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
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("First name")}</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={Boolean(touched.first_name && errors.first_name)}
                  onBlur={handleBlur}
                  defaultValue={currentValues.first_name}
                  onChange={handleChange}
                  size="lg"
                  name="first_name"
                />
                {!!touched.first_name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.first_name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Last name")}</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={Boolean(touched.last_name && errors.last_name)}
                  onBlur={handleBlur}
                  defaultValue={currentValues.last_name}
                  onChange={handleChange}
                  size="lg"
                  name="last_name"
                />
                {!!touched.last_name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.last_name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Gender")}</Form.Label>
                <Form.Select
                  size="lg"
                  defaultValue={currentValues.gender}
                  className="w-50"
                  name="gender"
                  isInvalid={Boolean(touched.gender && errors.gender)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </Form.Select>
                {!!touched.gender && (
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Date of birth")}</Form.Label>
                <br></br>
                <Form.Control
                  type="date"
                  max="2019-12-25"
                  className="no-outline-textfield form-control-lg"
                  defaultValue={currentValues.date_of_birth}
                  name="date_of_birth"
                  isInvalid={Boolean(
                    touched.date_of_birth && errors.date_of_birth
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.date_of_birth && (
                  <Form.Control.Feedback type="invalid">
                    {errors.date_of_birth}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Phone number")}</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  className="no-outline-textfield form-control-lg"
                  placeholder="0624 327 900"
                  defaultValue={currentValues.phone_number}
                  isInvalid={Boolean(
                    touched.phone_number && errors.phone_number
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.phone_number && (
                  <Form.Control.Feedback type="invalid">
                    {errors.phone_number}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Email")}</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  defaultValue={currentValues.email}
                  className="no-outline-textfield form-control-lg"
                  placeholder=""
                  isInvalid={Boolean(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <AddressField values={values} />
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-5">
                <Form.Label>{t("Education level")}</Form.Label>
                <Form.Select
                  size="lg"
                  className="w-50"
                  defaultValue={currentValues.education_level}
                  name="education_level"
                  isInvalid={Boolean(
                    touched.education_level && errors.education_level
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="primary">{t("Primary")}</option>
                  <option value="secondary">{t("Secondary")}</option>
                  <option value="vocational">{t("Vocational training")}</option>
                  <option value="diploma">{t("Diploma")}</option>
                  <option value="undergraduate">{t("Undergraduate")}</option>
                  <option value="postgraduate">{t("Postgraduate")}</option>
                </Form.Select>
                {!!touched.education_level && (
                  <Form.Control.Feedback type="invalid">
                    {errors.education_level}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-5">
                <Form.Label>{t("Employment status")}</Form.Label>
                <Form.Select
                  size="lg"
                  name="employment_status"
                  defaultValue={currentValues.employment_status}
                  isInvalid={Boolean(
                    touched.employment_status && errors.employment_status
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="not_employed">{t("Not Employment")}</option>
                  <option value="employed">{t("Employed")}</option>
                  <option value="self_employed">{t("Self employed")}</option>
                  <option value="retired">{t("Retired")}</option>
                </Form.Select>
                {!!touched.employment_status && (
                  <Form.Control.Feedback type="invalid">
                    {errors.employment_status}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("Identification type")}</Form.Label>
                <Form.Select
                  size="lg"
                  name="id_type"
                  defaultChecked={currentValues.id_type}
                  value={values.id_type}
                  isInvalid={Boolean(touched.id_type && errors.id_type)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="nida">
                    {t("National Identification Card")}
                  </option>
                  <option value="driver_license">
                    {t("Driver's license")}
                  </option>
                  <option value="passport">{t("Passport")}</option>
                  <option value="voters_id">
                    {t("Voter's Identification Card")}
                  </option>
                </Form.Select>
                {!!touched.id_type && (
                  <Form.Control.Feedback type="invalid">
                    {errors.id_type}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <IdFormField
                id_type={values.id_type}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Col>
          </Row>
          <Row>
            <Form.Group className="mt-4">
              <Form.Label>
                {t(
                  "Are you a member of the National Health Insurance Fund(NHIF)?"
                )}
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Check
                  type="radio"
                  label={t("No")}
                  value={false}
                  checked={currentValues.hasNHIF}
                  className="m-1"
                  name="hasNHIF"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Check
                  type="radio"
                  label={t("Yes")}
                  value={true}
                  checked={currentValues.hasNHIF}
                  name="hasNHIF"
                  className="m-1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {!!touched.id_type && (
                <Form.Control.Feedback type="invalid">
                  {errors.id_type}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <div className="mt-5 d-flex flex-row justify-content-end">
            <Button
              variant="primary"
              className="ps-5 pe-5 pt-2 pb-2"
              type="submit"
            >
              {t("Continue")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInformationForm;
