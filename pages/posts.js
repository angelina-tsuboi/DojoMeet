import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import { useFirestore } from '../firebase/useFirestore';
import PostCard from '../components/PostCard/PostCard';
const firestore = useFirestore();
import Calendar from 'react-calendar';
import { infiniteScroll } from '../firebase/infinteScroll';
import 'react-calendar/dist/Calendar.css';
import Grid from '@material-ui/core/Grid';
import { format, toDate } from 'date-fns';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import ViewCard from '../components/ViewCard/ViewCard';
import styles from '../public/css/posts.module.css';
import TextField from '@material-ui/core/TextField';
import PostModal from '../components/Modals/PostModal/PostModal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import CreatePost from '../components/CreatePost/CreatePost';
import { UserDataContext } from '../providers/userdataprovider';
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
  const [selectedDate, setSelectedDate] = useState(false);
  const [postsForSelectedDate, setPostsForSelectedDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  let { currentUser } = fire.auth();
  const userData = useContext(UserDataContext);

  const handleClose = () => {
    console.log("closing 2")
    setOpen(false);
  };

  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getFormattedDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}

  const handleClickDate = (date) => {
    setValue(date)
    setSelectedDate(true);
    let today = getFormattedDate(date);
    let yesterday = new Date(today);
    let tommorow = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    tommorow.setDate(tommorow.getDate() + 1)

    today = new Date(today);
    fetchDataForDate(today, yesterday, tommorow);
  }

  const fetchDataForDate = (today, yesterday, tommorow) => {
    let postArray = [];
    console.log(yesterday.toDateString())
    console.log(tommorow.toDateString())
    fire.firestore().collection("posts").orderBy("date").where("date", "<", tommorow).where("date", ">", yesterday).limit(5).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let postData = { ...doc.data(), id: doc.id };
        postArray.push(postData);
      })
      console.log("gottem", postArray)
      setPostsForSelectedDate(postArray);
    }).catch((err) => {console.log(err)});
  }

  const fetchUpcomingData = () => {
    let postArray = [];
    fire.firestore().collection("posts").where("date", ">", new Date()).limit(5).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let postData = { ...doc.data(), id: doc.id };
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

  const togglePostModal = (postData) => {
    setSelectedPost(postData);
    setOpenPostModal(true);
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
              <h3 className={styles.eventTitle}>{!selectedDate ? "Events": `Events on ${format(value2, 'MM/dd/yyyy')}`}</h3>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Create Event
              </Button>
            </div>

{(postsForSelectedDate.length == 0 && !selectedDate) ?  <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
            >

              {posts.map(post =>
                <PostCard post={post} key={post.id} openPost={(postData) => togglePostModal(postData)}/>
              )}
            </InfiniteScroll>:<ul className={styles.postsDisplay}>
              {postsForSelectedDate.map(post =>
                <PostCard post={post} key={post.id} openPost={(postData) => togglePostModal(postData)}/>
              )}
            </ul>
            }
           

          </Grid>
          <Grid item xs={4}>
            <LocalizaitonProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value2}
                onChange={(newValue) => {
                  handleClickDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="standard" />}
              />
            </LocalizaitonProvider>
            <h3 className={styles.upcomingTitle}>Upcoming Events</h3>
            <ul className={styles.postsDisplay} onScroll={handleScroll}>
              {upcomingPosts.map(post =>
                <ViewCard post={post} key={post.id} />
              )}
            </ul>
          </Grid>

        </Grid>

        {notification}
      </div>

      {currentUser && <CreatePost open={open} onClose={handleClose} uid={currentUser.uid} router={router} />}
      {(currentUser && selectedPost) && <PostModal open={openPostModal} onClose={handleClosePostModal} post={selectedPost} userData={userData} />}
    </main>
  )
}
export default Posts;