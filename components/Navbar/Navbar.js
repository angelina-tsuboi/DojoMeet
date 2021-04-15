import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

const Navbar = ({ loggedIn }) => { 
  const router = useRouter()

  const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <h1 className={styles.title}>
            <Link href="/" color="white">
            DojoMeet
            </Link>
          </h1>
          <div className={styles.spacer}/>
          <div>
          {loggedIn
          ? <h1>logged in</h1>
          : <h1>logged out</h1>
        }
          
          <button value="about" className={styles.option} onClick={goToRoute}>About</button>
          <button value="features" color="inherit" className={styles.option} onClick={goToRoute}>Features</button>
          <button value="login" color="inherit" className={styles.option} onClick={goToRoute}>Login</button>
          <button value="register" color="inherit" className={styles.option} onClick={goToRoute}>Sign Up</button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;