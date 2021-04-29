import {
    Button,
    UncontrolledCollapse,
    NavItem,
    NavLink,
    Nav,
    Row,
    Col
  } from "reactstrap";
  import { useRouter } from 'next/router';


const SignedOutLinks = () => {
    let router = useRouter();
    
    goToRoute = (e) => {
        router.push(e.target.value);
    }

    return (
        <div>
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
        </div>
    )
}


export default SignedOutLinks;