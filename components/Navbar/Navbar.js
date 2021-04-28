import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import fire from '../../config/fire-conf';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import styles from './Navbar.module.css';
import Icon from '@material-ui/core/Icon';
import CreatePost from '../CreatePost/CreatePost';
import AddIcon from '@material-ui/icons/Add';

const Navbar = ({ loggedIn }) => { 
  const router = useRouter()
  let { currentUser } = fire.auth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <AppBar position="static">
        <Toolbar>
          <img src="/dojomeetIcon.png" className={styles.icon}/>
          <a href="/" className={styles.title}>Dojo Meet</a>
          <div className={styles.spacer}/>
          <div>

         

          {loggedIn
          ? <span>
            <button value="posts" className={styles.option} onClick={goToRoute}>Posts</button>
            <button value="players" color="inherit" className={styles.option} onClick={goToRoute}>Players</button>
            <button color="inherit" className={styles.option}  onClick={handleLogout}>Logout</button>
            <Button
            variant="contained"
            className={styles.createPostButton}
            onClick={handleClickOpen}
            startIcon={<AddIcon />}
          >
            Create Post
          </Button>
          </span>
          : <span>
          <button value="about" className={styles.option} onClick={goToRoute}>About</button>
          <button value="features" color="inherit" className={styles.option} onClick={goToRoute}>Features</button>
          <button value="login" color="inherit" className={styles.option} onClick={goToRoute}>Login</button>
          <button value="register" color="inherit" className={styles.option} onClick={goToRoute}>Sign Up</button>
          </span>
        }
          
          </div>
        </Toolbar>
      </AppBar>
      {currentUser && <CreatePost open={open} onClose={handleClose} uid={currentUser.uid}/>}
      
    </div>
  );
}
export default Navbar;