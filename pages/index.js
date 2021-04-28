import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import HomePage from '../components/HomePage/HomePage';
import {useContext} from 'react';
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
import {UserDataContext} from '../providers/userdataprovider';
import Divider from '@material-ui/core/Divider';


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = fire.auth();
  const [posts, setPosts] = useState([]);
  const userData = useContext(UserDataContext);
  const [userPosts, setUserPosts] = useState([]);
  const [notification, setNotification] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

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



  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>

      {notification}
      {!loggedIn
        ?
        <HomePage />
        :
    //     <div>
    //       <Grid container spacing={3}>
    //         {currentUser && 
    //         <Grid item xs={6}>
    //         <Card className={styles.profileCard} style={{ width: '70%', margin: 'auto', marginTop: '1rem' }}>
    //           <Avatar aria-label="recipe" src={currentUser.photoURL} style={{ height: '100px', width: '100px' }} className={styles.profileImage}></Avatar>
    //           <CardContent>
    //             <Typography variant="h4" color="textPrimary" component="p">
    //               {name}
    //             </Typography>
    //             <Typography variant="h6" color="textSecondary" component="p">
    //               {location}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary" component="p">
    //               {description}
    //             </Typography>
    //             <Button onClick={handleClickOpen}>
    //               Edit Profile
    //         </Button>

    //             <Button onClick={handleLogout}>
    //               Logout
    //         </Button>
    //           </CardContent>
    //         </Card>
    //       </Grid>
    //       }
            
    //         <Grid item xs={6}>

    //           <h3>Your Upcoming Events</h3>
    //           <List>
    //             {posts.map(post =>
    //               <div key={post.id}>
    //                 <ListItem key={post.id}>
    //                   <ListItemAvatar>
    //                     <Avatar>
    //                       <ImageIcon />
    //                     </Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText primary={post.title} secondary="Jan 9, 2014" />
    //                 </ListItem>
    //                 <Divider variant="inset" component="li" />
    //               </div>

    //             )}
    //           </List>

    //           <h3>Your Events</h3>
    //           {userPosts.map(post =>
    //             <div key={post.id}>
    //               <ListItem key={post.id}>
    //                 <ListItemAvatar>
    //                   <Avatar>
    //                     <ImageIcon />
    //                   </Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText primary={post.title} secondary="Jan 9, 2014" />
    //               </ListItem>
    //               {/* <Divider variant="inset" component="li" /> */}
    //             </div>
    //           )}


    //         </Grid>
    //       </Grid>

    //     </div>

    //   }
    //   {(currentUser && userData) && 
    //     <EditProfile open={open} onClose={handleClose} profile={userData}/>
    //   }

    <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Connect
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Message
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      Jessica Jones{" "}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          An artist of considerable range, Ryan — the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy —
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
}
    </div>
  
)
}
export default Home;