import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import { useFirestore } from '../firebase/useFirestore';
import PostCard from '../components/PostCard/PostCard';
const firestore = useFirestore();
import Calendar from 'react-calendar';
import { infiniteScroll } from '../firebase/infinteScroll';
import 'react-calendar/dist/Calendar.css';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import format from 'date-fns/format';
import ViewCard from '../components/ViewCard/ViewCard';
import styles from '../public/css/posts.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import CreatePost from '../components/CreatePost/CreatePost';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
const scroll = infiniteScroll();



const Posts = () => {
  const router = useRouter()
  const [posts, setPosts] = useState(scroll.messages);
  const [upcomingPosts, setUpcomingPosts] = useState(scroll.messages);
  const [hasMore, setHasMore] = useState(true);
  const [timeEvents, setTimeEvents] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [value, onChange] = useState(new Date());
  const [value2, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  let { currentUser } = fire.auth();

  const handleClose = () => {
    console.log("closing 2")
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchUpcomingData = () => {
    let postArray = [];
    fire.firestore().collection("posts").where("date", ">", new Date()).limit(5).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let postData = {...doc.data(), id: doc.id};
        postArray.push(postData);
      })
      setUpcomingPosts(postArray);
    })
  }

  const fetchMoreData = () => {
    if (posts.length % 10 != 0) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setPosts(...posts, ...scroll.getMoreMessages("posts", 10))
    }, 500);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) console.log("hit the bottom");
    return bottom;
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    scroll.getMessages("posts", "rrr", 10);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setOpen(false);
    fetchUpcomingData();
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

            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >

              {posts.map(post =>
                <PostCard post={post} key={post.id} />
              )}
            </InfiniteScroll>

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
            <ul className={styles.postsDisplay} onScroll={handleScroll}>
              { upcomingPosts.map(post =>
                <PostCard post={post} key={post.id} />
              )}
            </ul>
          </Grid>

        </Grid>

        {notification}
      </div>

      {currentUser && <CreatePost open={open} onClose={handleClose} uid={currentUser.uid} router={router} />}
    </main>
  )
}
export default Posts;