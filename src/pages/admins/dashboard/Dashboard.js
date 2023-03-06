import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Dashboard</h1>
        <Row>
          <Col md={7}></Col>
          <Col md={5}>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Header>
                    <h3>Visitors</h3>
                  </Card.Header>
                  <Card.Body>
                    <h2 className="display-1">10</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Header>
                    <h3>Visitors</h3>
                  </Card.Header>
                  <Card.Body>
                    <h2 className="display-1">10</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Header>
                    <h3>Visitors</h3>
                  </Card.Header>
                  <Card.Body>
                    <h2 className="display-1">10</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
