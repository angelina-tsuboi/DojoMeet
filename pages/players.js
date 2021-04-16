import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import Link from 'next/link';
import PostCard from '../components/PostCard/PostCard';
import PlayerCard from '../components/PlayerCard/PlayerCard';


const Players = () => {
  const [players, setPlayers] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

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
      
        
        <h1>Posts</h1>
        {notification}

        <ul>
          {players.map(player =>
            <PlayerCard player={player} key={player.uid}/>
          )}
        </ul>


    </div>
  )
}
export default Players;