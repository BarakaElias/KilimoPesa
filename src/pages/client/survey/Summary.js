import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import useAppSelector from "../../../hooks/useAppSelector";
import { Link } from "react-router-dom";
import { CheckCircle } from "react-feather";
import { useTranslation } from "react-i18next";
const Summary = () => {
  const details = useAppSelector((state) => state.surveySlice);
  const personalInfo = details.personal_information;
  const practicedAgri = details.practiced_agriculture;
  const { t } = useTranslation();
  const agri_fields = details.the_survey.agricultural_fields;
  const [modalOpen, setModalOpen] = useState(false);
  console.log("All the details", details);
  const submitData = async () => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/handle-form`,
      null,
      {
        params: {
          personal_information: personalInfo,
          practicing: practicedAgri,
          the_survey: agri_fields,
        },
      }
    );
    console.log("Submit: ", response);
    setModalOpen(true);
  };
  return (
    <section className="bg-white h-auto">
      {modalOpen ? (
        <Modal show={true} size="xl" centered>
          <Modal.Header>
            <h2 className="text-center text-success">{t("Success")}</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-around align-items-center">
              <CheckCircle color="#4BBF73" size={128} />
              <h3>{t("Succesfully recorded")}</h3>

              <Link to="/">{t("Back to website")}</Link>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      <Container>
        <h1 className="kilimo-title-1 text-center pt-5">
          Kilimo Pesa Survey Form
        </h1>
        <p className="kilimo-description ps-5 pe-5 text-center fst-italic">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <Card>
          <Card.Header>
            <h1 className="text-center">{t("Summary")}</h1>
          </Card.Header>
          <Card.Body>
            <h2>{t("Personal Information")}</h2>
            <br></br>
            <Row>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("First name")}: </strong>
                  {personalInfo.first_name}
                </p>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Gender")}: </strong>
                  {t(personalInfo.gender)}
                </p>
              </Col>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Last name")}: </strong>
                  {personalInfo.last_name}
                </p>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Date of birth")}: </strong>
                  {personalInfo.date_of_birth}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Phone number")}: </strong>
                  {personalInfo.phone_number}
                </p>
              </Col>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Email")}: </strong>
                  {personalInfo.email}
                </p>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Region")}: </strong>
                  {personalInfo.address.region}
                </p>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("District")}: </strong>
                  {personalInfo.address.district}
                </p>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Ward")}: </strong>
                  {personalInfo.address.ward}
                </p>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("Street")}: </strong>
                  {personalInfo.address.street}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">
                    {t("Education level")}:{" "}
                  </strong>
                  {t(personalInfo.education_level)}
                </p>
              </Col>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">
                    {t("Employment status")}:{" "}
                  </strong>
                  {t(personalInfo.employment_status)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">
                    {t("Identification type")}:{" "}
                  </strong>
                  {t(personalInfo.id_type)}
                </p>
              </Col>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("ID Number")}: </strong>
                  {personalInfo.id_number}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="mb-3">
                  <strong className="fw-bolder">{t("NHIF member")}: </strong>
                  {personalInfo.hasNHIF ? t("Yes") : t("No")}
                </p>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <h1 className="mb-4">
                {t("Agricultural activities currently practicing")}
              </h1>
              {practicedAgri.length > 0 ? (
                <ol className="list-group list-group-numbered">
                  {practicedAgri.map((field) => {
                    if (field === undefined) {
                      return null;
                    }
                    return (
                      <li
                        key={"list" + field.field}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{t(field.field)}</div>
                          <strong>{t("Category")}: </strong>
                          <div className="d-flex flex-row flex-wrap">
                            {field.categories.map((c) => (
                              <p className="badge bg-primary p-2 m-1">{t(c)}</p>
                            ))}
                          </div>
                          <br></br>
                          {field.categories.some(
                            (x) => x === "Crop production"
                          ) ||
                          field.categories.some(
                            (v) => v === "Livestock production"
                          ) ||
                          field.categories.some(
                            (z) => z === "Fish production"
                          ) ? (
                            <React.Fragment>
                              <strong>{t("Production scale")}: </strong>
                              {field.production_scale} <br></br>
                            </React.Fragment>
                          ) : null}
                          <br></br>
                          <strong>{t("Activities")}:</strong>
                          {field.activities.map((a) => {
                            if (a === undefined) {
                              return null;
                            }
                            return (
                              <span
                                key={a.activity}
                                className="m-1 p-2 badge bg-primary rounded-pill"
                              >
                                {a.activity === "Other" ? (
                                  <div>
                                    {t(a.activity)} - {a.act} - {a.region}
                                  </div>
                                ) : (
                                  <div>
                                    {t(a.activity)} - {a.region}
                                  </div>
                                )}
                              </span>
                            );
                          })}
                          <br></br>
                          <strong>{t("Production scale")}:</strong>{" "}
                          {field.production_scale}
                        </div>
                        {field.region}
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <strong>{t("Not practcing agriculture")}</strong>
              )}
            </Row>
            <hr></hr>
            <Row>
              <h1 className="mb-4">{t("Survey")}</h1>
              <Col>
                <ol className="list-group list-group-numbered">
                  {agri_fields.map((field) => {
                    if (field === undefined) {
                      return null;
                    }
                    return (
                      <li
                        key={"list" + field.field}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{t(field.field)}</div>
                          <strong>{t("Category")}: </strong>
                          <div className="d-flex flex-row flex-wrap">
                            {field.categories.map((l) => (
                              <p className="badge bg-primary p-2 m-1">{t(l)}</p>
                            ))}
                          </div>
                          <br></br>
                          {field.category === "Crop production" ||
                          field.category === "Livestock production" ||
                          field.category === "Fish production" ? (
                            <React.Fragment>
                              <strong>{t("Production scale")}: </strong>
                              {field.production_scale} <br></br>
                            </React.Fragment>
                          ) : null}
                          <br></br>
                          <strong>{t("Activities")}:</strong>
                          {field.activities.map((a) => {
                            if (a === undefined) {
                              return null;
                            }
                            return (
                              <span
                                key={a.activity}
                                className="m-1 p-2 badge bg-primary rounded-pill"
                              >
                                {a.activity[0] === "Other" ? (
                                  <div>
                                    {t(a.activity)} - {a.act} - {a.region}
                                  </div>
                                ) : (
                                  <div>
                                    {t(a.activity)} - {a.region}
                                  </div>
                                )}
                              </span>
                            );
                          })}
                          <br></br>
                          <strong>{t("Production scale")}:</strong>{" "}
                          {field.production_scale}
                        </div>
                        {field.region}
                      </li>
                    );
                  })}
                </ol>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex flex-row justify-content-center">
              <Button
                onClick={submitData}
                className="ps-5 pe-5 pt-2 pb-2"
                variant="primary"
              >
                {t("Submit Information")}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </section>
  );
};
export default Summary;
