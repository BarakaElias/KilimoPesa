import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Row,
  Container,
  Button,
  Col,
  Modal,
  CloseButton,
} from "react-bootstrap";
import { Eye, Trash } from "react-feather";
import { Helmet } from "react-helmet-async";
import FullTable from "../../../ui/tables/FullTable";

const Results = () => {
  const rows = [
    {
      id: 1,
      name: "Baraka Urio",
      date_of_birth: "12-03-1991",
      address: "Dar es Salaam, Kinondoni, Tegeta",
      phone_number: "255624327900",
      email: "baraka@aimfirms.com",
      education_level: "University",
      employment_status: "Self employed",
      id_type: "nida",
      id_number: "12345678901234567890",
      is_practicing: false,
    },
    {
      id: 1,
      name: "Angel Walter",
      date_of_birth: "12-03-1991",
      address: "Dar es Salaam, Kinondoni, Tegeta",
      phone_number: "255624327900",
      email: "baraka@aimfirms.com",
      education_level: "University",
      employment_status: "Not Employed",
      id_type: "nida",
      id_number: "12345678901234567890",
      is_practicing: false,
    },
    {
      id: 1,
      name: "Sabrina King",
      date_of_birth: "12-03-1991",
      address: "Dar es Salaam, Kinondoni, Tegeta",
      phone_number: "255624327900",
      email: "baraka@aimfirms.com",
      education_level: "University",
      employment_status: "Self employed",
      id_type: "nida",
      id_number: "12345678901234567890",
      is_practicing: false,
    },
    {
      id: 1,
      name: "Baraka Urio",
      date_of_birth: "12-03-1991",
      address: "Dar es Salaam, Kinondoni, Tegeta",
      phone_number: "255624327900",
      email: "baraka@aimfirms.com",
      education_level: "Diploma",
      employment_status: "Employed",
      id_type: "nida",
      id_number: "12345678901234567890",
      is_practicing: false,
    },
  ];
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
      maxWidth: 300,
    },
    {
      Header: "Employment status",
      accessor: "employment_status",
    },
    {
      Header: "Practicing Agriculture",
      accessor: "is_practicing",
      Cell: ({ value }) => {
        if (value) {
          return "Yes";
        }
        return "No";
      },
    },
    {
      Header: "",
      accessor: "id",
      Cell: ({ value }) => {
        return (
          <div className="d-flex flex-row justify-content-between">
            <Eye className="m-3" size="24" color="#293042" />
            <Trash
              style={{ cursor: "pointer" }}
              className="m-3"
              size="24"
              color="#d34d49"
            />
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Helmet title="Award Categories" />
      <Container fluid className="p-0">
        <Row>
          <Col md={11}>
            <h1 className="h3 mb-3">Survey Entries</h1>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <FullTable values={rows} cols={columns} />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Results;
