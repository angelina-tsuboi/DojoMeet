
import React from "react";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import { useRouter } from 'next/router';
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

  goToRoute = (e) => {
    this.props.router.push(e.target.value);
  }
  
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
                    <NavLink href="about" onClick={e => goToRoute(e)} >
                      About <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="features" onClick={e => goToRoute(e)} >
                      Features <span className="sr-only">(current)</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="login" onClick={e => goToRoute(e)}>
                      Login
                    </NavLink>
                  </NavItem>
                 
                </Nav>
              </UncontrolledCollapse>

              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="signup" 
                  onClick={e => goToRoute(e)}
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
