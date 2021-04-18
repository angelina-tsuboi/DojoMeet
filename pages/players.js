import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import Link from 'next/link';
import PostCard from '../components/PostCard/PostCard';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import Fuse from "fuse.js";
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import styles from '../styles/Players.module.css';
import Searchbar from '../components/Searchbar/Searchbar';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  let fuse = new Fuse(players, {
    keys: ["name"]
  });

  const onSearchChange = (pattern) => {
    console.log(pattern)
    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setData([]);
    } else {
      result.forEach(({item}) => {
        matches.push(item);
      });
      setData(matches);
    }
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
        setData(postsData);
        fuse = new Fuse(players, {
          keys: ["name"],
        });
      });
  }, []);

  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Head>
        <title>Blog App</title>
      </Head>

      <Searchbar
        placeholder="Search"
        onChange={(e) => onSearchChange(e.target.value)}
       />
      
  
      <Grid container spacing={3} className={styles.playerGrid}>
      {players.map(player =>
        <Grid item xs={6} sm={3} key={player.uid}>
          <PlayerCard player={player} key={player.uid}/>
        </Grid>
      )}
        
      </Grid>

        {notification}

    </div>
  )
}
export default Players;