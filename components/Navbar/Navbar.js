import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import fire from '../../config/fire-conf';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

const Navbar = ({ loggedIn }) => { 
  const router = useRouter()
  const history = useHistory();

  const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
  }
  
  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
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

          <button value="about" className={styles.option} onClick={goToRoute}>About</button>
          <button value="features" color="inherit" className={styles.option} onClick={goToRoute}>Features</button>

          {loggedIn
          ? <div>
            <button value="login" color="inherit" className={styles.option}  onClick={handleLogout}>Logout</button>
            </div>
          : <div>
          <button value="login" color="inherit" className={styles.option} onClick={goToRoute}>Login</button>
          <button value="register" color="inherit" className={styles.option} onClick={goToRoute}>Sign Up</button>
          </div>
        }
          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;