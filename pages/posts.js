import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import {useFirestore} from '../firebase/useFirestore';
import PostCard from '../components/PostCard/PostCard';
const firestore = useFirestore();
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format';
import ViewCard from '../components/ViewCard/ViewCard';
import styles from '../styles/Posts.module.css';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [timeEvents, setTimeEvents] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [value, onChange] = useState(new Date());
  const [value2, setValue] = React.useState(new Date());

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
        <Grid item xs={4}>
        {/* <Calendar
        onChange={(e) => {updateDate(e)}}
        value={value}
        className={styles.Calendar}
      />  
      <h3 className={styles.eventDisplay}>Events on {format(value, 'MM/dd/yyyy')}</h3>
      {(timeEvents && timeEvents.length > 0) && 
        <ul>
        {timeEvents.map(post =>
          <ViewCard post={post} key={post.id} />
        )}
      </ul>
      }
      {(timeEvents && timeEvents.length == 0) &&
          <h3>
            No Events Found For Date
          </h3>
      } */}

<LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={value2}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizaitonProvider>
        </Grid>
        <Grid item xs={8}>
        <ul className={styles.postsDisplay}>
          {posts.map(post =>
            <PostCard post={post} key={post.id} />
          )}
        </ul>
        </Grid>
      </Grid>
      
        {notification}
    </div>
    </main>
  )
}
export default Posts;