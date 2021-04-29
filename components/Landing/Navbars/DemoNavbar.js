
import React from "react";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import fire from '../../../config/fire-conf';
import { useRouter } from 'next/router';
import SignedInLinks from './Links/SignedInLinks/SignedInLinks';
import SignedOutLinks from './Links/SignedOutLinks/SignedOutLinks';
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container
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
    collapseOpen: false,
    userSignedIn: false
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
<header className="header-global">
    <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main">
      <Container>
        <NavbarBrand href="" onClick={e => goToRoute(e)}>
          <img src="/logo.png" />
        </NavbarBrand>
        <button className="navbar-toggler" id="navbar-primary">
          <span className="navbar-toggler-icon" />
        </button>
        {fire.auth().onAuthStateChanged(user => user ? <SignedInLinks /> : <SignedOutLinks />)}
      </Container>
    </Navbar>
  </header>
    )
    
  }
}

export default DemoNavbar;
