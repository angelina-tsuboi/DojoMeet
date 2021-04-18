import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import Link from 'next/link';
import PostCard from '../components/PostCard/PostCard';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import styles from '../styles/Players.module.css';


const Players = () => {
  const [players, setPlayers] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const onSearchChange = (term, hits) => {
    console.log("this is cool", hits)
  
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })


    // calls after every render
  useEffect(() => {
    fire.firestore()
      .collection('users')
      .onSnapshot(snap => {
        const postsData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlayers(postsData);
      });
  }, []);

  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Head>
        <title>Blog App</title>
      </Head>
      
  
      <Grid container spacing={3} className={styles.playerGrid}>
      {players.map(player =>
        <Grid item xs={6} sm={3}>
          <PlayerCard player={player} key={player.uid}/>
        </Grid>
      )}
        
      </Grid>

        {notification}

    </div>
  )
}
export default Players;