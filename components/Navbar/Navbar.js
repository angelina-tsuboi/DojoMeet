import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './Navbar.module.css';

const Navbar = () => { 
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <h1 className={styles.title}>
            DojoMeet
          </h1>
          <div />
          <div>
          <Button color="inherit">About</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;