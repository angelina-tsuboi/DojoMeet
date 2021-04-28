import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import HomePage from '../components/HomePage/HomePage';
import {useContext} from 'react';
import {UserDataContext} from '../providers/userdataprovider';
import { Button, Card, Container, Row, Col } from "reactstrap";


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

    <main className="profile-page" >
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
                            style={{ height: '150px', width: '150px' }}
                            src={currentUser.photoURL}
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
                          <span className="description">Followers</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Following</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Events</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                    {name} {" "}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {location}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Southwest Redondo Beach Dojo
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Orange Belt
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                        {description}
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