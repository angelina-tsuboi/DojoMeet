import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row } from "reactstrap";

import styles from './HomePage.module.css';

import Hero from "../../components/Landing/views/IndexSections/Hero";
import Buttons from "../../components/Landing/views/IndexSections/Buttons.js";
import Inputs from "../../components/Landing/views/IndexSections/Inputs.js";
import CustomControls from "../../components/Landing/views/IndexSections/CustomControls.js";
import Menus from "../../components/Landing/views/IndexSections/Menus.js";
import Navbars from "../../components/Landing/views/IndexSections/Navbars.js";
import Tabs from "../../components/Landing/views/IndexSections/Tabs.js";
import Progress from "../../components/Landing/views/IndexSections/Progress.js";
import Pagination from "../../components/Landing/views/IndexSections/Pagination.js";
import Pills from "../../components/Landing/views/IndexSections/Pills.js";
import Labels from "../../components/Landing/views/IndexSections/Labels.js";
import Alerts from "../../components/Landing/views/IndexSections/Alerts.js";
import Typography from "../../components/Landing/views/IndexSections/Typography.js";
import Modals from "../../components/Landing/views/IndexSections/Modals.js";
import Datepicker from "../../components/Landing/views/IndexSections/Datepicker.js";
import TooltipPopover from "../../components/Landing/views/IndexSections/TooltipPopover.js";
import Carousel from "../../components/Landing/views/IndexSections/Carousel.js";
import Icons from "../../components/Landing/views/IndexSections/Icons.js";
import Login from "../../components/Landing/views/IndexSections/Login.js";
import Download from "../../components/Landing/views/IndexSections/Download.js";
import CardsFooter from "../../components/Landing/Footers/CardsFooter";


const HomePage = () => {
  const router = useRouter()

  const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
  }


  return (
    <div>
      <main>
        <Hero />
        <Buttons />
        <Inputs />
        <section className="section">
          <Container>
            <CustomControls />
            <Menus />
          </Container>
        </section>
        <Navbars />
        <section className="section section-components">
          <Container>
            <Tabs />
            <Row className="row-grid justify-content-between align-items-center mt-lg">
              <Progress />
              <Pagination />
            </Row>
            <Row className="row-grid justify-content-between">
              <Pills />
              <Labels />
            </Row>
            <Alerts />
            <Typography />
            <Modals />
            <Datepicker />
            <TooltipPopover />
          </Container>
        </section>
        <Carousel />
        <Icons />
        <Login />
        <Download />
      </main>

      <CardsFooter />
    </div>
  )
}
export default HomePage;