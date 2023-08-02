import React, { useRef, useState, useCallback } from "react";
import { FieldArray, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Alert } from "react-bootstrap";
import useAppSelector from "../../../../hooks/useAppSelector";
import CategoryQuestions from "./.././CategoryQuestions";
import { useTranslation } from "react-i18next";
const PracticingQuestions = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  touched,
  errors,
}) => {
  const inputRef = useRef();
  const { t, i18n } = useTranslation();
  console.log("Values: ", values);
  const currentValues = useAppSelector(
    (state) => state.surveySlice.practiced_agriculture
  );
  console.log("Questions current values: ", currentValues);
  const regions = [
    "Kilimanjaro",
    "Mwanza",
    "Arusha",
    "Tanga",
    "Kigoma",
    "Mara",
    "Lindi",
    "Mtwara",
    "Pwani",
    "Manyara",
    "Shinyanga",
    "Singida",
    "Morogoro",
    "Iringa",
    "Kagera",
    "Njombe",
    "Tabora",
    "Rubuma",
    "Katavi",
    "Pemba South",
    "Rukwa",
    "Mjini Magharibi",
    "Geita",
  ];
  const practicingQuestions = [
    {
      id: 1,
      type: "agricultural_fields",
      question: "Which of these fields in Agriculture are you participating",
      options: ["Farming", "Livestock keeping", "Fishing"],
    },
    {
      id: 2,
      type: "sub-activity",
      question: "",
      options: ["Cows", "Goats", "Chickens", "Ducks", "Maize"],
    },
    // {
    //   id: 3,
    //   type: "region",
    //   question: "What regions do you practice the above activities in",
    // },
    {
      id: 5,
      type: "challenges",
      question: "What challenges do you face?",
    },
  ];

  const farmingActivities = [
    "Cereal",
    "Fruits",
    "Vegetables",
    "Ingredients",
    "Edible oil crops",
    "Root crops",
    "Other commercial crops",
    "Agroforestry",
    "Other",
  ];
  const livestockActivities = [
    "Cows",
    "Goats",
    "Sheep",
    "Chicken",
    "Pigs",
    "Bee keeping",
    "Other",
  ];
  const fishingActivities = [
    "Salt water",
    "Fresh water",
    "Pond breeding",
    "Other",
  ];
  const PracticingQuestion = ({ the_question }) => {
    switch (the_question.type) {
      case "agricultural_fields":
        let index = 0;
        return (
          <React.Fragment>
            <FieldArray
              name="agricultural_fields"
              render={(arrayHelpers) => (
                <React.Fragment>
                  <div className="d-flex flex-row">
                    {the_question.options.map((option) => {
                      console.log("Helpers: ");
                      let found = false;
                      values.agricultural_fields.map((ff) => {
                        if (ff.field === option) {
                          found = true;
                        }
                      });
                      return (
                        <Form.Group className="m-2" key={option + "j"}>
                          <div className="d-flex flex-row">
                            <Field
                              className="form-check-input"
                              key={option}
                              checked={found}
                              defaultValue={
                                currentValues.agricultural_fields
                                  ? currentValues.agricultural_fields[index][
                                      "field"
                                    ]
                                  : ""
                              }
                              onChange={(e) => {
                                //first check if already present

                                if (found) {
                                  console.log(
                                    "Field: ",
                                    `${option} is present. Removing!!`
                                  );
                                  arrayHelpers.remove({ field: option });
                                } else {
                                  console.log(
                                    "Field: ",
                                    `${option} is not present. Adding!!`
                                  );
                                  arrayHelpers.push({ field: option });
                                }
                              }}
                              name={`agricultural_fields[${index++}]['field']`}
                              type="checkbox"
                              value={option}
                            ></Field>
                            <Form.Label>{t(option)}</Form.Label>
                          </div>
                        </Form.Group>
                      );
                    })}
                  </div>
                  <ErrorMessage name="agricultural_fields">
                    {(msg) => {
                      if (typeof msg === "string") {
                        return <p className="text-danger">{msg}</p>;
                      }
                      return null;
                    }}
                  </ErrorMessage>
                  {/* after fixing the array thing */}

                  {/* <CategoryQuestions values={values} /> */}
                </React.Fragment>
              )}
            />
          </React.Fragment>
        );
      case "sub-activity":
        const checkedStatus = (activity, indexx) => {
          console.log("Checking for: ", activity);
          if (values.agricultural_fields[indexx]["activities"] === undefined) {
            return false;
          }
          let isThere = false;
          values.agricultural_fields[indexx]["activities"].map((at) => {
            console.log(
              `Comparing ${at.activity} against activity:${activity}`
            );
            if (at.activity === activity) {
              isThere = true;
            }
          });
          console.log("Value of includes(): ", isThere);
          return isThere;
        };
        const handleActivityChange = (
          isChecked,
          field,
          activity,
          value,
          push,
          remove
        ) => {
          const theField = values.agricultural_fields.find(
            (f) => f.field === field
          );

          if (isChecked) {
            console.log("Adding");
            push({ activity: activity });
          } else {
            const activityIndex = theField.activities.findIndex(
              (a) => a.activity === activity
            );
            console.log(
              "HadleActivityChange: ",
              `${theField} on Index: ${activityIndex}`
            );
            remove(activityIndex);
          }
        };

        return (
          <Row>
            {values.agricultural_fields.map((field) => {
              if (typeof field !== "undefined") {
                switch (field.field) {
                  case "Farming":
                    let indexOfFarming = values.agricultural_fields.findIndex(
                      (x) => {
                        return x.field === "Farming";
                      }
                    );

                    return (
                      <React.Fragment key={field.field + "fragment"}>
                        <Alert className="p-1" variant="secondary">
                          <h4 className="fw-bolder m-3">{t("Farming")}</h4>
                        </Alert>
                        <ErrorMessage
                          name={`agricultural_fields[${indexOfFarming}]`}
                        >
                          {(msg) => {
                            console.log("Farming categories error: ", msg);
                            if (typeof msg === "string") {
                              return <p className="text-danger">{msg}</p>;
                            }
                            if (typeof msg === "object") {
                              return Object.keys(msg).map((k) => {
                                console.log("K: ", msg[k]);
                                console.log("typeof erro ", typeof msg[k]);
                                if (k === "activities" && msg[k].length > 0) {
                                  return typeof msg[k] === "string" ? (
                                    <p className="text-danger">{msg[k]}</p>
                                  ) : (
                                    msg[k].map((kk) => {
                                      return Object.keys(kk).map((kkk) => {
                                        return (
                                          <p className="text-danger">
                                            {kk[kkk]}
                                          </p>
                                        );
                                      });
                                    })
                                  );
                                }
                                return <p className="text-danger">{msg[k]}</p>;
                              });
                            }

                            return null;
                          }}
                        </ErrorMessage>
                        <div>
                          <h4 className="fw-bolder">
                            {t("Farming categories")}
                          </h4>
                          <div className="d-flex flex-row flex-wrap">
                            {[
                              "Crop production",
                              "Transport",
                              "Storage",
                              "Agricultural inputs",
                              "Processing",
                              "Markets",
                            ].map((cat) => (
                              <Form.Group key={cat} className="m-2">
                                <div className="d-flex flex-row flex-wrap">
                                  <Field
                                    className="form-check-input"
                                    key={cat}
                                    name={`agricultural_fields[${indexOfFarming}]['categories']`}
                                    type="checkbox"
                                    value={cat}
                                  />
                                  <Form.Label>{t(cat)}</Form.Label>
                                </div>
                                {console.log(
                                  "Agricultural field categories: ",
                                  values.agricultural_fields[indexOfFarming][
                                    "categories"
                                  ]
                                )}
                                {cat === "Crop production" &&
                                typeof values.agricultural_fields[
                                  indexOfFarming
                                ]["categories"] !== "undefined" &&
                                values.agricultural_fields[indexOfFarming][
                                  "categories"
                                ].some((x) => x === "Crop production") ? (
                                  <Form.Group>
                                    <p className="fw-bolder">
                                      {t("Production scale")}:
                                    </p>
                                    {["0-5", "6-50", "50+"].map((scale) => (
                                      <Form.Group>
                                        <Field
                                          className="form-radio"
                                          key={scale}
                                          name={`agricultural_fields[${indexOfFarming}]['production_scale']`}
                                          type="radio"
                                          value={scale}
                                        />
                                        <Form.Label>{scale}</Form.Label>
                                      </Form.Group>
                                    ))}
                                  </Form.Group>
                                ) : null}
                              </Form.Group>
                            ))}
                          </div>
                          <hr></hr>
                        </div>
                        <Col key={"amzing"} md={10} sm={12}>
                          <h4 className="fw-bolder">
                            {t("What farming activities do you do")}? (Multiple)
                          </h4>
                          {farmingActivities.map((activity) => {
                            var zFarming =
                              values.agricultural_fields[indexOfFarming][
                                "activities"
                              ] !== undefined
                                ? values.agricultural_fields[indexOfFarming][
                                    "activities"
                                  ].length
                                : 0;
                            return (
                              <Row>
                                <Col md={5}>
                                  <FieldArray
                                    name={`agricultural_fields[${indexOfFarming}]['activities']`}
                                  >
                                    {({ insert, remove, push }) => (
                                      <Form.Group key={"formgroup" + activity}>
                                        <Field
                                          key={activity + "dd" + 12}
                                          value={activity}
                                          checked={checkedStatus(
                                            activity,
                                            indexOfFarming
                                          )}
                                          className="form-check-input"
                                          onChange={(e) => {
                                            handleActivityChange(
                                              e.target.checked,
                                              "Farming",
                                              activity,
                                              e.target.value,
                                              push,
                                              remove
                                            );
                                          }}
                                          type="checkbox"
                                          // name={`agricultural_fields[${indexOfFarming}]['activities'][${zFarming}].activity`}
                                        />
                                        <Form.Label>{t(activity)}</Form.Label>
                                      </Form.Group>
                                    )}
                                  </FieldArray>
                                </Col>
                                {values.agricultural_fields[indexOfFarming][
                                  "activities"
                                ] &&
                                values.agricultural_fields[indexOfFarming][
                                  "activities"
                                ].find((a) => a.activity === activity) ? (
                                  <Col>
                                    <Row>
                                      {values.agricultural_fields[
                                        indexOfFarming
                                      ]["activities"].find(
                                        (a) => a.activity === "Other"
                                      ) && activity === "Other" ? (
                                        <Col md={12}>
                                          <Form.Group as={Row}>
                                            <Form.Label column md={2}>
                                              {t("Specify")}:
                                            </Form.Label>
                                            <Col md={10}>
                                              <Field
                                                component={Form.Control}
                                                name={`agricultural_fields[${indexOfFarming}]['activities'][${values.agricultural_fields[
                                                  indexOfFarming
                                                ]["activities"].findIndex(
                                                  (a) => a.activity === activity
                                                )}].act`}
                                              />
                                            </Col>
                                          </Form.Group>
                                        </Col>
                                      ) : null}
                                      <Col>
                                        <Form.Group as={Row}>
                                          <Form.Label column md={2}>
                                            {t("Region")}:
                                          </Form.Label>
                                          <Col md={10}>
                                            <Field
                                              as="select"
                                              name={`agricultural_fields[${indexOfFarming}]['activities'][${values.agricultural_fields[
                                                indexOfFarming
                                              ]["activities"].findIndex(
                                                (a) => a.activity === activity
                                              )}].region`}
                                              className="form-select"
                                            >
                                              <option></option>
                                              {regions.map((region) => (
                                                <option
                                                  key={region}
                                                  value={region}
                                                >
                                                  {region}
                                                </option>
                                              ))}
                                            </Field>
                                          </Col>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Col>
                                ) : null}
                                {/* {console.log(
                                "Incrementing index of farming activities: ",
                                (zFarming += 1)
                              )} */}
                              </Row>
                            );
                          })}
                          <hr></hr>
                        </Col>
                      </React.Fragment>
                    );
                  case "Livestock keeping":
                    let indexOfLiveStock = values.agricultural_fields.findIndex(
                      (x) => {
                        if (typeof x === "undefined") {
                          return false;
                        }
                        return x.field === "Livestock keeping";
                      }
                    );
                    // var zLivestock =
                    //   values.agricultural_fields[indexOfLiveStock][
                    //     "activities"
                    //   ] !== undefined
                    //     ? values.agricultural_fields[indexOfLiveStock][
                    //         "activities"
                    //       ].length
                    //     : 0;

                    return (
                      <React.Fragment>
                        <Alert className="p-1" variant="secondary">
                          <h4 className="fw-bolder m-3">
                            {t("Livestock keeping")}
                          </h4>
                        </Alert>
                        <ErrorMessage
                          name={`agricultural_fields[${indexOfLiveStock}]`}
                        >
                          {(msg) => {
                            console.log("Livestock categories error: ", msg);
                            if (typeof msg === "string") {
                              return <p className="text-danger">{msg}</p>;
                            }
                            if (typeof msg === "object") {
                              return Object.keys(msg).map((k) => {
                                if (k === "activities" && msg[k].length > 0) {
                                  return typeof msg[k] === "string" ? (
                                    <p className="text-danger">{msg[k]}</p>
                                  ) : (
                                    msg[k].map((kk) => {
                                      return Object.keys(kk).map((kkk) => {
                                        return (
                                          <p className="text-danger">
                                            {kk[kkk]}
                                          </p>
                                        );
                                      });
                                    })
                                  );
                                }
                                return <p className="text-danger">{msg[k]}</p>;
                              });
                            }

                            return null;
                          }}
                        </ErrorMessage>
                        <div>
                          <h4 className="fw-bolder">
                            {t("Livestock categories")}
                          </h4>
                          <div className="d-flex flex-row flex-wrap">
                            {[
                              "Livestock production",
                              "Transport",
                              "Storage",
                              "Agricultural inputs",
                              "Processing",
                              "Markets",
                            ].map((cat) => (
                              <Form.Group key={cat + "fgcat"} className="m-2">
                                <div className="d-flex flex-row flex-wrap">
                                  <Field
                                    className="form-check-input"
                                    key={cat}
                                    name={`agricultural_fields[${indexOfLiveStock}]['categories']`}
                                    type="checkbox"
                                    value={cat}
                                  />
                                  <Form.Label>{t(cat)}</Form.Label>
                                </div>
                                {cat === "Livestock production" &&
                                typeof values.agricultural_fields[
                                  indexOfLiveStock
                                ]["categories"] !== "undefined" &&
                                values.agricultural_fields[indexOfLiveStock][
                                  "categories"
                                ].some((b) => b === "Livestock production") ? (
                                  <Form.Group>
                                    <Form.Label>
                                      {t("Production scale")}:
                                    </Form.Label>
                                    {["0-5", "6-50", "50+"].map((scale) => (
                                      <Form.Group>
                                        <Field
                                          className="form-radio"
                                          key={scale}
                                          name={`agricultural_fields[${indexOfLiveStock}]['production_scale']`}
                                          type="radio"
                                          value={scale}
                                        />
                                        <Form.Label>{scale}</Form.Label>
                                      </Form.Group>
                                    ))}
                                  </Form.Group>
                                ) : null}
                              </Form.Group>
                            ))}
                          </div>
                          <hr></hr>
                        </div>
                        <Col key={field.field} md={10} sm={12}>
                          <h4 className="fw-bolder">
                            {t("What livestock activities do you do")}?
                          </h4>
                          {livestockActivities.map((activity) => (
                            <Row>
                              <Col md={5}>
                                <FieldArray
                                  name={`agricultural_fields[${indexOfLiveStock}]['activities']`}
                                >
                                  {({ insert, remove, push }) => (
                                    <Form.Group>
                                      <Field
                                        key={activity + "dd" + 12}
                                        value={activity}
                                        checked={checkedStatus(
                                          activity,
                                          indexOfLiveStock
                                        )}
                                        onChange={(e) => {
                                          handleActivityChange(
                                            e.target.checked,
                                            "Livestock keeping",
                                            activity,
                                            e.target.value,
                                            push,
                                            remove
                                          );
                                        }}
                                        className="form-check-input"
                                        type="checkbox"
                                        // name={`agricultural_fields[${indexOfLiveStock}]['activities'][${zLivestock}].activity`}
                                      />
                                      <Form.Label>{t(activity)}</Form.Label>
                                    </Form.Group>
                                  )}
                                </FieldArray>
                              </Col>
                              {values.agricultural_fields[indexOfLiveStock][
                                "activities"
                              ] &&
                              values.agricultural_fields[indexOfLiveStock][
                                "activities"
                              ].find((a) => a.activity === activity) ? (
                                <Col>
                                  <Row>
                                    {values.agricultural_fields[
                                      indexOfLiveStock
                                    ]["activities"].find(
                                      (a) => a.activity === "Other"
                                    ) && activity === "Other" ? (
                                      <Col md={12}>
                                        <Form.Group as={Row}>
                                          <Form.Label column md={2}>
                                            {t("Specify")}:
                                          </Form.Label>
                                          <Col md={10}>
                                            <Field
                                              component={Form.Control}
                                              name={`agricultural_fields[${indexOfLiveStock}]['activities'][${values.agricultural_fields[
                                                indexOfLiveStock
                                              ]["activities"].findIndex(
                                                (a) => a.activity === "Other"
                                              )}].act`}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Col>
                                    ) : null}
                                    <Col>
                                      <Form.Group as={Row}>
                                        <Form.Label column md={2}>
                                          {t("Region")}:
                                        </Form.Label>
                                        <Col md={10}>
                                          <Field
                                            as="select"
                                            name={`agricultural_fields[${indexOfLiveStock}]['activities'][${values.agricultural_fields[
                                              indexOfLiveStock
                                            ]["activities"].findIndex(
                                              (a) => a.activity === activity
                                            )}].region`}
                                            className="form-select"
                                          >
                                            <option></option>
                                            {regions.map((region) => (
                                              <option
                                                key={region}
                                                value={region}
                                              >
                                                {region}
                                              </option>
                                            ))}
                                          </Field>
                                        </Col>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Col>
                              ) : null}
                            </Row>
                          ))}
                          <hr></hr>
                        </Col>
                      </React.Fragment>
                    );
                  case "Fishing":
                    const indexOfFishing =
                      values.agricultural_fields.length === 0
                        ? 0
                        : values.agricultural_fields.findIndex((x) => {
                            if (typeof x === "undefined") {
                              return false;
                            }
                            return x.field === "Fishing";
                          });
                    // var zFishing =
                    //   values.agricultural_fields[indexOfFarming][
                    //     "activities"
                    //   ] !== undefined
                    //     ? values.agricultural_fields[indexOfFishing][
                    //         "activities"
                    //       ].length
                    //     : 0;
                    // console.log("Assigned zFishing");

                    return (
                      <React.Fragment>
                        <Alert className="p-1" variant="secondary">
                          <h4 className="fw-bolder m-3">{t("Fishing")}</h4>
                        </Alert>
                        <ErrorMessage
                          name={`agricultural_fields[${indexOfFishing}]`}
                        >
                          {(msg) => {
                            console.log("Fishing categories error: ", msg);
                            if (typeof msg === "string") {
                              return <p className="text-danger">{msg}</p>;
                            }
                            if (typeof msg === "object") {
                              return Object.keys(msg).map((k) => {
                                if (k === "activities" && msg[k].length > 0) {
                                  return typeof msg[k] === "string" ? (
                                    <p className="text-danger">{msg[k]}</p>
                                  ) : (
                                    msg[k].map((kk) => {
                                      return Object.keys(kk).map((kkk) => {
                                        return (
                                          <p className="text-danger">
                                            {kk[kkk]}
                                          </p>
                                        );
                                      });
                                    })
                                  );
                                }
                                return <p className="text-danger">{msg[k]}</p>;
                              });
                            }

                            return null;
                          }}
                        </ErrorMessage>
                        <div>
                          <h4 className="fw-bolder">
                            {t("Fishing categories")}
                          </h4>
                          <div className="d-flex flex-row flex-wrap">
                            {[
                              "Fish production",
                              "Transport",
                              "Storage",
                              "Agricultural inputs",
                              "Processing",
                              "Markets",
                            ].map((cat) => (
                              <Form.Group key={cat} className="m-2">
                                <div className="d-flex flex-row flex-wrap">
                                  <Field
                                    className="form-check-input"
                                    key={cat}
                                    name={`agricultural_fields[${indexOfFishing}]['categories']`}
                                    type="checkbox"
                                    value={cat}
                                  />
                                  <Form.Label>{t(cat)}</Form.Label>
                                </div>
                                {cat === "Fish production" &&
                                typeof values.agricultural_fields[
                                  indexOfFishing
                                ]["categories"] !== "undefined" &&
                                values.agricultural_fields[indexOfFishing][
                                  "categories"
                                ].some((d) => d === "Fish production") ? (
                                  <Form.Group>
                                    <Form.Label>
                                      {t("Production scale")}:
                                    </Form.Label>
                                    {["0-5", "6-50", "50+"].map((scale) => (
                                      <Form.Group>
                                        <Field
                                          className="form-radio"
                                          key={scale}
                                          name={`agricultural_fields[${indexOfFishing}]['production_scale']`}
                                          type="radio"
                                          value={scale}
                                        />
                                        <Form.Label>{scale}</Form.Label>
                                      </Form.Group>
                                    ))}
                                  </Form.Group>
                                ) : null}
                              </Form.Group>
                            ))}
                          </div>
                          <hr></hr>
                        </div>
                        <Col key={field.field} md={10} sm={12}>
                          <h4 className="fw-bolder">
                            {t("What fishing activities do you do")}?
                          </h4>
                          {fishingActivities.map((activity) => (
                            <Row>
                              <Col md={5}>
                                <FieldArray
                                  name={`agricultural_fields[${indexOfFishing}]['activities']`}
                                >
                                  {({ insert, remove, push }) => (
                                    <Form.Group>
                                      <Field
                                        key={activity + "dd" + 12}
                                        value={activity}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={checkedStatus(
                                          activity,
                                          indexOfFishing
                                        )}
                                        onChange={(e) => {
                                          handleActivityChange(
                                            e.target.checked,
                                            "Fishing",
                                            activity,
                                            e.target.value,
                                            push,
                                            remove
                                          );
                                        }}
                                        // name={`agricultural_fields[${indexOfFishing}]['activities'][${zFishing}].activity`}
                                      />
                                      <Form.Label>{t(activity)}</Form.Label>
                                    </Form.Group>
                                  )}
                                </FieldArray>
                              </Col>
                              {values.agricultural_fields[indexOfFishing][
                                "activities"
                              ] &&
                              values.agricultural_fields[indexOfFishing][
                                "activities"
                              ].find((a) => a.activity === activity) ? (
                                <Col>
                                  <Row>
                                    {values.agricultural_fields[indexOfFishing][
                                      "activities"
                                    ].find((a) => a.activity === "Other") &&
                                    activity === "Other" ? (
                                      <Col md={12}>
                                        <Form.Group as={Row}>
                                          <Form.Label column md={2}>
                                            {t("Specify")}:
                                          </Form.Label>
                                          <Col md={10}>
                                            <Field
                                              component={Form.Control}
                                              name={`agricultural_fields[${indexOfFishing}]['activities'][${values.agricultural_fields[
                                                indexOfFishing
                                              ]["activities"].findIndex(
                                                (a) => a.activity === activity
                                              )}].act`}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Col>
                                    ) : null}
                                    <Col>
                                      <Form.Group as={Row}>
                                        <Form.Label column md={2}>
                                          {t("Region")}:
                                        </Form.Label>
                                        <Col md={10}>
                                          <Field
                                            as="select"
                                            name={`agricultural_fields[${indexOfFishing}]['activities'][${values.agricultural_fields[
                                              indexOfFishing
                                            ]["activities"].findIndex(
                                              (a) => a.activity === activity
                                            )}].region`}
                                            className="form-select"
                                          >
                                            <option></option>
                                            {regions.map((region) => (
                                              <option
                                                key={region}
                                                value={region}
                                              >
                                                {region}
                                              </option>
                                            ))}
                                          </Field>
                                        </Col>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Col>
                              ) : null}
                            </Row>
                          ))}
                        </Col>
                      </React.Fragment>
                    );
                  default:
                    return (
                      <React.Fragment>
                        {/* <h1>Select something</h1> */}
                      </React.Fragment>
                    );
                }
              }
            })}
          </Row>
        );

      case "scale":
        let sub_indes = 0;
        return (
          <Row>
            {values.agricultural_fields.map((field) => (
              <Col key={sub_indes + 100 + "dfd"} sm={12} md={4}>
                <Row>
                  {typeof field !== "undefined" ? <h4>{field.field}</h4> : null}
                  <Col>
                    <Field
                      value="small"
                      name={`agricultural_fields[${sub_indes}]['scale']`}
                      type="radio"
                      className="form-check-input"
                    />
                    <Form.Label>{t("Small")}</Form.Label>
                  </Col>
                  <Col>
                    <Field
                      value="medium"
                      className="form-check-input"
                      name={`agricultural_fields[${sub_indes}]['scale']`}
                      type="radio"
                    />
                    <Form.Label>{t("Medium")}</Form.Label>
                  </Col>
                  <Col>
                    <Field
                      value="large"
                      name={`agricultural_fields[${sub_indes++}]['scale']`}
                      type="radio"
                      className="form-check-input"
                    />
                    <Form.Label>{t("Large")}</Form.Label>
                  </Col>
                </Row>
              </Col>
            ))}
            <ErrorMessage name="scale" />
          </Row>
        );
      case "challenges":
        const handlleTextChange = (e) => {
          const the_text = e.target.value;
        };
        return (
          <Form.Group className="mb-3">
            {/* <Form.Control
              as="textarea"
              onFocus={handleFocus}
              onBlur={handleBlur}
              inputRef={inputRef}
              key="challenges"
              onChange={handleChallengeChange}
              name="challenges"
              className="no-outline-textfield form-control-lg"
              placeholder=""
            /> */}
            {/* <Field
              id="challenge-field"
              name="challenges"
              component={Form.Control}
            /> */}
            <Form.Control
              type="text"
              name="challenges"
              className="no-outline-textfield form-control-lg"
              placeholder=""
              isInvalid={Boolean(touched.challenges && errors.challenges)}
              onBlur={handleBlur}
            />
            {!!touched.challenges && (
              <Form.Control.Feedback type="invalid">
                {errors.challenges}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {practicingQuestions.map((question) => (
        <Form.Group className="mt-5 mb-5" key={question.id + "qn"}>
          {/* <Form.Label className="fw-bold">{question.question}</Form.Label> */}
          <h4 className="fw-bolder">{t(question.question)}</h4>
          <PracticingQuestion the_question={question} />
        </Form.Group>
      ))}
    </React.Fragment>
  );
};

export default PracticingQuestions;
