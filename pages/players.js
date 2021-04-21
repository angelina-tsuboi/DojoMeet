import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import { useFirestore } from '../firebase/useFirestore';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import Fuse from "fuse.js";
import Grid from '@material-ui/core/Grid';
import styles from '../styles/Players.module.css';
import Searchbar from '../components/Searchbar/Searchbar';
const firestore = useFirestore();

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  let fuse = new Fuse(players, {
    keys: ["name"]
  });

  const onSearchChange = (pattern) => {
    if (pattern == "") setData(players);
    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setData([]);
    } else {
      result.forEach(({ item }) => {
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
    firestore.getCollection("users", (result) => {
      const userData = result.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPlayers(userData);
      setData(userData);
      fuse = new Fuse(userData, {
        keys: ["name"],
      });
    })
  }, []);

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>

      <Searchbar
        placeholder="Search for players..."
        onChange={(e) => onSearchChange(e.target.value)}
      />


      <Grid container spacing={3} className={styles.playerGrid}>
        {data.map(player =>
          <Grid item xs={6} sm={3} key={player.uid}>
            <PlayerCard player={player} key={player.uid} />
          </Grid>
        )}

      </Grid>

      {notification}


      <div class="container">
        <div className={styles.grid7}>
          <div className={styles.card}>
            <img src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d5363c18112a02ce22d0c46f8570147&auto=format&fit=crop&w=635&q=80%20635w" alt="profile-pic" className={styles.profile} />
            <h1 className={styles.title}>Bevely Little</h1>
            <p className={styles.jobTitle}> SENIOR PRODUCT DESIGNER</p>
            <div className={styles.desc}>
              <p>Create usable interface and designs @GraphicSpark</p>
            </div>
            <button className={styles.btn}> Hire me</button>
            <hr />
          </div>
        </div>
      </div>

    </div>
  )
}
export default Players;