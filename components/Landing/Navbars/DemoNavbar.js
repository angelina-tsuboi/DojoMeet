
import React from "react";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main">
            <Container>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                Primary Color
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-primary">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-primary">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-primary">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                      About <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                      Features <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                      Login
                    </NavLink>
                  </NavItem>
                 
                </Nav>
              </UncontrolledCollapse>

              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-cloud-download mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    Get Started
                      </span>
                </Button>
              </NavItem>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
