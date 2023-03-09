import React from "react";
import { FieldArray, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Alert } from "react-bootstrap";
import useAppSelector from "../../../hooks/useAppSelector";
import { useTranslation } from "react-i18next";
import CategoryQuestions from "./CategoryQuestions";
const SurveyQuestions = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  const { t, i18n } = useTranslation();
  const currentValues = useAppSelector(
    (state) => state.surveySlice.the_survey.agricultural_fields
  );
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
  const agricultural_fields = [
    {
      field: "Farming",
    },
  ];
  const practicingQuestions = [
    {
      id: 1,
      type: "agricultural_fields",
      question: "Which of these fields in Agriculture are you participating?",
      options: ["Farming", "Livestock keeping", "Fishing"],
    },
    {
      id: 2,
      type: "sub-activity",
      question: "Specify what activity are you involved in (Sub activity)",
      options: ["Cows", "Goats", "Chickens", "Ducks", "Maize"],
    },
    {
      id: 3,
      type: "region",
      question: "Select the region you are practicing in",
    },
    {
      id: 4,
      type: "scale",
      question: "At what scale do you practice this Activity?",
      options: ["Small", "Medium", "Large"],
    },
    {
      id: 5,
      type: "challenges",
      question: "What challenges do you face?",
    },
    // {
    //   id: 6,
    //   type: "categories",
    //   question: "Select the category",
    // },
  ];
  const interestedQuestions = [
    {
      id: 10,
      type: "agricultural_fields",
      question: "Which of these fields in Agriculture are you interested in?",
      options: ["Farming", "Livestock keeping", "Fishing"],
    },
    {
      id: 11,
      type: "sub-activity",
      question: "",
      options: ["Cows", "Goats", "Chickens", "Ducks", "Maize"],
    },
    // {
    //   id: 12,
    //   type: "region",
    //   question: "What region do you wish to practice at?",
    // },

    // {
    //   id: 14,
    //   type: "categories",
    //   question: "Select the category",
    // },
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
  const SurveyQuestion = ({ the_question }) => {
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
                              onChange={(e) => {
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
            console.log("Undefined", values.agricultural_fields[indexx]);
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
          activity,
          value,
          push,
          remove
        ) => {
          if (isChecked) {
            console.log("Adding");
            push({ activity: activity });
          } else {
            remove({
              activity: value,
            });
          }
        };
        return (
          <Row>
            {values.agricultural_fields.map((field) => {
              if (
                typeof field !== "undefined" &&
                typeof field.field !== "undefined"
              ) {
                switch (field.field) {
                  case "Farming":
                    let indexOfFarming = values.agricultural_fields.findIndex(
                      (x) => {
                        return x.field === "Farming";
                      }
                    );
                    var zFarming = 0;

                    return (
                      <React.Fragment key={field.fields + "fragment"}>
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
                                console.log("Value of k: ", k);
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
                                    <Form.Label>
                                      {t("Production scale")}:
                                    </Form.Label>
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
                            {t(
                              "What farming activities are you interested in doing"
                            )}
                            ?
                          </h4>
                          {farmingActivities.map((activity) => (
                            <Row>
                              <Col md={5}>
                                <FieldArray
                                  name={`agricultural_fields[${indexOfFarming}]['activities']`}
                                >
                                  {({ insert, push, remove }) => (
                                    <Form.Group key={"formgroup" + activity}>
                                      <Field
                                        key={activity + "dd" + 12}
                                        value={activity}
                                        onChange={(e) => {
                                          handleActivityChange(
                                            e.target.checked,
                                            activity,
                                            e.target.value,
                                            push,
                                            remove
                                          );
                                        }}
                                        checked={checkedStatus(
                                          activity,
                                          indexOfFarming
                                        )}
                                        className="form-check-input"
                                        type="checkbox"
                                        name={`agricultural_fields[${indexOfFarming}]['activities'][${zFarming}].activity`}
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
                                    {values.agricultural_fields[indexOfFarming][
                                      "activities"
                                    ].find((a) => a.activity === "Other") ? (
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
                            </Row>
                          ))}
                          <hr></hr>
                        </Col>
                      </React.Fragment>
                    );
                  case "Livestock keeping":
                    const indexOfLiveStock =
                      values.agricultural_fields.length === 0
                        ? 0
                        : values.agricultural_fields.findIndex((x) => {
                            if (typeof x === "undefined") {
                              return false;
                            }
                            return x.field === "Livestock keeping";
                          });
                    // let indexOfLiveStock = values.agricultural_fields.findIndex(
                    //   (x) => {
                    //     if (typeof x === "undefined") {
                    //       return false;
                    //     }
                    //     return x.field === "Livestock keeping";
                    //   }
                    // );
                    var zLivestock = 0;

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
                            {t(
                              "What livestock activities are you interested in doing"
                            )}
                            ?
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
                                        className="form-check-input"
                                        checked={checkedStatus(
                                          activity,
                                          indexOfLiveStock
                                        )}
                                        onChange={(e) => {
                                          handleActivityChange(
                                            e.target.checked,
                                            activity,
                                            e.target.value,
                                            push,
                                            remove
                                          );
                                        }}
                                        type="checkbox"
                                        name={`agricultural_fields[${indexOfLiveStock}]['activities'][${zLivestock}].activity`}
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
                                    ) ? (
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
                    var zFishing = 0;

                    return (
                      <React.Fragment>
                        <Alert className="p-1" variant="secondary">
                          <h4 className="fw-bolder m-3">{t("Fishing")}</h4>
                        </Alert>
                        <ErrorMessage
                          name={`agricultural_fields[${indexOfFishing}]`}
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
                            {" "}
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
                            {t(
                              "What fishing activities are you interested in doing"
                            )}
                            ?
                          </h4>
                          {fishingActivities.map((activity) => (
                            <Row>
                              <Col md={5}>
                                <FieldArray
                                  name={`agricultural_fields[${indexOfFishing}]['activities']`}
                                >
                                  {({ insert, push, remove }) => (
                                    <Form.Group>
                                      <Field
                                        key={activity + "dd" + 12}
                                        value={activity}
                                        checked={checkedStatus(
                                          activity,
                                          indexOfFishing
                                        )}
                                        onChange={(e) => {
                                          handleActivityChange(
                                            e.target.checked,
                                            activity,
                                            e.target.value,
                                            push,
                                            remove
                                          );
                                        }}
                                        className="form-check-input"
                                        type="checkbox"
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
                                    ].find((a) => a.activity === "Other") ? (
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
      case "region":
        return (
          <Row className="mt-3 mb-3">
            <FieldArray
              name={`agricultural_fields`}
              render={(arrayHelpers) => (
                <React.Fragment>
                  {values.agricultural_fields.map((field) => {
                    console.log("Region field: ", field);
                    if (typeof field !== "undefined") {
                      const sub_indexs = values.agricultural_fields.findIndex(
                        (x) => x === field
                      );
                      return (
                        <Col key={field.field} md={4} sm={12}>
                          <h1>{t(field.field)}</h1>
                          <Field
                            as="select"
                            name={`agricultural_fields[${sub_indexs}]['region']`}
                            className="form-select"
                          >
                            <option></option>
                            {regions.map((region) => (
                              <option
                                // selected={
                                //   `agricultural_fields[${sub_indexs}]['regions']` ===
                                //   region
                                //     ? true
                                //     : false
                                // }
                                key={region}
                                value={region}
                              >
                                {region}
                              </option>
                            ))}
                          </Field>
                        </Col>
                      );
                    }
                  })}
                </React.Fragment>
              )}
            />
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
                    />
                    <Form.Label>{t("Small")}</Form.Label>
                  </Col>
                  <Col>
                    <Field
                      value="medium"
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
        return (
          <Form.Group className="mb-3">
            <Field name="challenges" component={Form.Control} />
          </Form.Group>
        );
      default:
        return null;
    }
  };
  // if (isPracticing) {
  //   return (
  //     <React.Fragment>
  //       {practicingQuestions.map((question) => (
  //         <Form.Group className="mt-5 mb-5" key={question.id}>
  //           {/* <Form.Label className="fw-bold">{question.question}</Form.Label> */}
  //           <h4 className="fw-bolder">{question.question}</h4>

  //           <SurveyQuestion the_question={question} />
  //         </Form.Group>
  //       ))}
  //     </React.Fragment>
  //   );
  // } else {
  return (
    <React.Fragment>
      {interestedQuestions.map((question) => (
        <Form.Group key={question.id}>
          {/* <Form.Label className="fw-bold">{question.question}</Form.Label> */}
          <h4 className="fw-bolder">{t(question.question)}</h4>
          <SurveyQuestion the_question={question} />
        </Form.Group>
      ))}
    </React.Fragment>
  );
  // }
};

export default SurveyQuestions;
