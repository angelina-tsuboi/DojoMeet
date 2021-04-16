import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import HomePage from '../components/HomePage/HomePage';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';



const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = fire.auth()
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  useEffect(() => {
    fire.firestore()
      .collection('posts')
      .onSnapshot(snap => {
        const postsData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
      });
  }, []);


  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }
  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Head>
        <title>Blog App</title>
      </Head>
      
        {notification}
        {!loggedIn
          ?
          <HomePage />
          :
          <div>
            <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card>
              <Avatar aria-label="recipe" src={currentUser.photoURL}></Avatar>
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {currentUser.displayName}
              </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Paper>
              <ul>
              {posts.map(post =>
                <li key={post.id}>
                  <Link href="/posts/[id]" as={'/posts/' + post.id}>
                    <a itemProp="hello">{post.title}</a>
                  </Link>
                </li>
              )}
            </ul>
              </Paper>
            </Grid>
            </Grid>
            
          </div>
          
        }
    </div>
  )
}
export default Home;