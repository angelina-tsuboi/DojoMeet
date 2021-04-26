/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">
                  Join DojoMeet Now!{" "}
                  <span className="text-success">
                    Sign Up with two easy clicks
                  </span>
                </h2>
                <p className="lead">
                  Cause if you do, it can be yours for FREE. Hit the button
                  below to navigate to Creative Tim where you can find the
                  Design System in React. Start a new project or give an old
                  Bootstrap project a new look!
                </p>
                <div className="btn-wrapper">
                  <Button
                    className="mb-3 mb-sm-0"
                    color="primary"
                    href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                  >
                    Sign Up
                  </Button>
                </div>
            
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Download;
