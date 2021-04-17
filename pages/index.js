import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import HomePage from '../components/HomePage/HomePage';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditProfile from '../components/EditProfile/EditProfile';
import styles from '../styles/Index.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = fire.auth();
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [notification, setNotification] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    fire.auth()
      .signOut()
  }

  const handleClose = () => {
    if (currentUser) {
      fire.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get().then(data => {
          setDescription(data.data().description);
          setLocation(data.data().location);
          setName(data.data().name);


          fire.firestore()
            .collection('posts')
            .where('uid', '==', currentUser.uid)
            .get().then((snapshot) => {
              const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setUserPosts(userData);
            })

        })
    }
    setOpen(false);
  };


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
    if (currentUser) {
      fire.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get().then(data => {
          setDescription(data.data().description);
          setLocation(data.data().location);
          setName(data.data().name);


          fire.firestore()
            .collection('posts')
            .where('uid', '==', currentUser.uid)
            .get().then((snapshot) => {
              const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setUserPosts(userData);
            })

        })
    }
  });

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



  return (
    <div>
      <Navbar loggedIn={loggedIn} />
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
                <Avatar aria-label="recipe" src={currentUser.photoURL} style={{ height: '80px', width: '80px' }}></Avatar>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                  </Typography>
                  <Button onClick={handleClickOpen}>
                    Edit Profile
              </Button>

                  <Button onClick={handleLogout}>
                    Logout
              </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>

              <h3>Upcoming Events</h3>
              <List>
                {posts.map(post =>
                  <div>
                    <ListItem key={post.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={post.title} secondary="Jan 9, 2014" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>

                )}
              </List>

              <h3>Your Events</h3>
              {userPosts.map(post =>
                <div>
                  <ListItem key={post.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={post.title} secondary="Jan 9, 2014" />
                  </ListItem>
                  {/* <Divider variant="inset" component="li" /> */}
                </div>
              )}


            </Grid>
          </Grid>

        </div>

      }
      {currentUser &&
        <EditProfile open={open} onClose={handleClose} profile={{ name: name, description: description, location: location, photoURL: currentUser.photoURL, email: currentUser.email, uid: currentUser.uid }} />
      }

    </div>
  )
}
export default Home;