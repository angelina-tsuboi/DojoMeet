import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    optionButton: {
        marginLeft: '1rem',
        marginRight: '1rem'
    },

    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
  }));

const Navbar = () => {
    const classes = useStyles();  


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            DojoMeet
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Button color="inherit" className={classes.optionButton}>About</Button>
          <Button color="inherit" className={classes.optionButton}>Features</Button>
        <Button color="inherit" className={classes.optionButton}>Login</Button>
        <Button color="inherit" className={classes.optionButton}>Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;