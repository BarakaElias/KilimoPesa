import React from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

import SignIn from "../../components/auth/SignIn";
import avatar from "../../assets/img/avatars/avatar-2.jpg";
import { Link } from "react-router-dom";

const SignInPage = () => {
  console.log("Signin page displaying");
  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <div className="text-center mt-4">
        <h2 className="kilimo-title-1">Ali Kiba Kilimo Foundation</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-4">
            <div className="text-center">
              <img
                src={avatar}
                alt="Afya Awards logo"
                className="img-fluid rounded-circle"
                width="132"
                height="132"
              />
            </div>
            <SignIn />
          </div>
          {/* <Link to="/auth/sign-up">Create a free account</Link> */}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SignInPage;
