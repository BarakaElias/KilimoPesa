import React from "react";
import { Form } from "react-bootstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
const CategoryQuestions = ({ values }) => {
  const { t } = useTranslation();
  const livestockIndex = values.agricultural_fields.findIndex((a) => {
    console.log("Livestock hiihii: ", a);
    if (typeof a === "undefined") {
      return false;
    }
    if (a.field === "undefined") {
      return false;
    }
    if (typeof a.field[0] !== "undefined") {
      return a.field[0] === "Livestock keeping";
    }
    return false;
  });
  console.log("Livestock index: ", livestockIndex);

  const farmingIndex = values.agricultural_fields.findIndex((a) => {
    if (typeof a === "undefined") {
      return false;
    }
    if (a.field === "undefined") {
      return false;
    }
    return a.field[0] === "Farming";
  });
  console.log("Farming index: ", farmingIndex);
  const fishingIndex = values.agricultural_fields.findIndex((a) => {
    if (typeof a === "undefined") {
      return false;
    }
    if (a.field === "undefined") {
      return false;
    }
    return a.field[0] === "Fishing";
  });
  console.log("Fishing index: ", fishingIndex);
  return (
    <React.Fragment>
      <div>
        {farmingIndex > -1 ? (
          <div>
            <Form.Label>{t("Farming categories")}</Form.Label>
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
                      name={`agricultural_fields[${farmingIndex}]['categories']`}
                      type="checkbox"
                      value={cat}
                    />
                    <Form.Label>{t(cat)}</Form.Label>
                  </div>
                  {console.log(
                    "Agricultural field categories: ",
                    values.agricultural_fields[farmingIndex]["categories"]
                  )}
                  {cat === "Crop production" &&
                  typeof values.agricultural_fields[farmingIndex][
                    "categories"
                  ] !== "undefined" &&
                  values.agricultural_fields[farmingIndex]["categories"].some(
                    (x) => x === "Crop production"
                  ) ? (
                    <Form.Group>
                      <Form.Label>{t("Production scale")}:</Form.Label>
                      {["0-5", "6-50", "50+"].map((scale) => (
                        <Form.Group>
                          <Field
                            className="form-radio"
                            key={scale}
                            name={`agricultural_fields[${farmingIndex}]['production_scale']`}
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
        ) : null}
      </div>
      <div>
        {livestockIndex > -1 ? (
          <div>
            <Form.Label>{t("Livestock categories")}</Form.Label>
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
                      name={`agricultural_fields[${livestockIndex}]['categories']`}
                      type="checkbox"
                      value={cat}
                    />
                    <Form.Label>{t(cat)}</Form.Label>
                  </div>
                  {cat === "Livestock production" &&
                  typeof values.agricultural_fields[livestockIndex][
                    "categories"
                  ] !== "undefined" &&
                  values.agricultural_fields[livestockIndex]["categories"].some(
                    (b) => b === "Livestock production"
                  ) ? (
                    <Form.Group>
                      <Form.Label>{t("Production scale")}:</Form.Label>
                      {["0-5", "6-50", "50+"].map((scale) => (
                        <Form.Group>
                          <Field
                            className="form-radio"
                            key={scale}
                            name={`agricultural_fields[${livestockIndex}]['production_scale']`}
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
        ) : null}
      </div>
      <div>
        {fishingIndex > -1 ? (
          <div>
            <Form.Label>{t("Fishing categories")}</Form.Label>
            <div className="d-flex flex-row flex-wrap">
              {[
                "Fish production",
                "Transport",
                "Storage",
                "Agricultural inputs",
                "Processing",
                "Marketing",
              ].map((cat) => (
                <Form.Group key={cat} className="m-2">
                  <div className="d-flex flex-row flex-wrap">
                    <Field
                      className="form-check-input"
                      key={cat}
                      name={`agricultural_fields[${fishingIndex}]['categories']`}
                      type="checkbox"
                      value={cat}
                    />
                    <Form.Label>{t(cat)}</Form.Label>
                  </div>
                  {cat === "Fish production" &&
                  typeof values.agricultural_fields[fishingIndex][
                    "categories"
                  ] !== "undefined" &&
                  values.agricultural_fields[fishingIndex]["categories"].some(
                    (d) => d === "Fish production"
                  ) ? (
                    <Form.Group>
                      <Form.Label>{t("Production scale")}:</Form.Label>
                      {["0-5", "6-50", "50+"].map((scale) => (
                        <Form.Group>
                          <Field
                            className="form-radio"
                            key={scale}
                            name={`agricultural_fields[${fishingIndex}]['production_scale']`}
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
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default CategoryQuestions;
