import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import { useFirestore } from '../firebase/useFirestore';
import PostCard from '../components/PostCard/PostCard';
const firestore = useFirestore();
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format';
import ViewCard from '../components/ViewCard/ViewCard';
import styles from'../public/css/posts.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import CreatePost from '../components/CreatePost/CreatePost';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [timeEvents, setTimeEvents] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [value, onChange] = useState(new Date());
  const [value2, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  let { currentUser } = fire.auth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setOpen(false);
  }, []);

  const updateDate = (date) => {
    onChange(date);

  }


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
    firestore.getCollection("posts", (result) => {
      const returnData = result.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(returnData);

      firestore.getDateDocuments(new Date(), (result) => {
        setTimeEvents(result);
      })
    })
  }, []);

  return (

    <main>
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <div>
        <Head>
          <title>Blog App</title>
        </Head>
        <Grid container>
          <Grid item xs={8}>
            <div className={styles.actionDisplay}>
              <h3 className={styles.eventTitle}>Events</h3>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Create Event
              </Button>
            </div>

            <ul className={styles.postsDisplay}>
              {posts.map(post =>
                <PostCard post={post} key={post.id} />
              )}
            </ul>
          </Grid>
          <Grid item xs={4}>
            <LocalizaitonProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value2}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="standard" />}
              />
            </LocalizaitonProvider>
            <h3 className={styles.upcomingTitle}>Upcoming Events</h3>
          </Grid>

        </Grid>

        {notification}
      </div>

      {currentUser && <CreatePost open={open} onClose={handleClose} uid={currentUser.uid}/>}
    </main>
  )
}
export default Posts;