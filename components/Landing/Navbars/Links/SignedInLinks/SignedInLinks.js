
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
  import fire from '../../../../../config/fire-conf';


const SignedInLinks = () => {
    let router = useRouter();
    
    const goToRoute = (e) => {
        router.push(e.target.value);
    }

    const handleLogout = () => {
        fire.auth()
          .signOut()
          .then(() => {
            router.push("/");
          });
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
                            Posts <span className="sr-only">(current)</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="features" onClick={e => goToRoute(e)} >
                            Players <span className="sr-only">(current)</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="profile" onClick={e => goToRoute(e)} >
                            Profile <span className="sr-only">(current)</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={handleLogout}>
                            Logout
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
                        Profile
                    </span>
                </Button>
            </NavItem>
        </div>
    )
}


export default SignedInLinks;