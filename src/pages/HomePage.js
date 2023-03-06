import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  Sliders,
  Smartphone,
  Mail,
  Users,
  Code,
  DownloadCloud,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import avatar from "./../assets/img/vsdashboard.webp";

const Features = () => (
  <section className="py-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">Features you'll love</h2>
            <p className="text-muted text-lg">
              A responsive dashboard built for your award ceremonies.
            </p>
          </div>

          <Row className="text-start">
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Sliders />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">2 Platforms</h4>
                  <p className="fs-lg">
                    This management system offers a platform for gathering
                    information and an administrative dashbaord to oversee the
                    process & results
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Smartphone />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Fully Responsive</h4>
                  <p className="fs-lg">
                    With mobile, tablet & desktop support it doesn't matter what
                    device you're using. The system is responsive in all
                    browsers.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Mail />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Support</h4>
                  <p className="fs-lg">
                    Our team would love to here from you. We welcome any new
                    ideas.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Users />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Secure</h4>
                  <p className="fs-lg">
                    The management system securely stores data and
                    administrative user information.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <Code />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Robust</h4>
                  <p className="fs-lg">
                    We strictly follow the development guidelines to make your
                    business processes smooth and go according to plan
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex py-3">
                <div className="landing-feature">
                  <i data-feather="download-cloud"></i>
                  <DownloadCloud />
                </div>
                <div className="flex-grow-1">
                  <h4 className="mt-0">Regular Updates</h4>
                  <p className="fs-lg">
                    From time to time you'll receive an updates containing new
                    security and more advanced features
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const HomePage = () => {
  const navigate = useNavigate();

  console.log("This is home");
  return (
    <React.Fragment>
      <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <h1 className="kilimo-title-1 text-center">Kilimo Pesa</h1>
          <p className="kilimo-description text-center ps-5 pe-5">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
          </p>
          <div className="m-auto d-flex flex-row justify-content-around w-25">
            <Button
              onClick={() => navigate("/form")}
              className="m-3 ps-5 pe-5 pt-1 pb-1"
              variant="secondary"
            >
              Survey Form
            </Button>
            <Button
              onClick={() => navigate("/admin/dashboard")}
              className="m-3 ps-5 pe-5 pt-1 pb-1"
              variant="primary"
            >
              Dashboard
            </Button>
          </div>
        </Container>
      </section>
      <section className="landing-intro bg-primary pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container>
          <h2 className="text-center text-light mb-5">
            Show the story of Agriculture
          </h2>
          <p className="kilimo-description text-light text-center ps-5 pe-5">
            Transform your survey results into a report your stakeholders will
            understand. With survey dashboards, you can highlight key takeaways
            and even add in your own notes or recommended next steps.
          </p>
        </Container>
      </section>
      <Features />
    </React.Fragment>
  );
};
export default HomePage;
