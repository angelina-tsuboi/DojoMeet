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


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [value, onChange] = useState(new Date());

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
      firestore.getCollection("posts", (result) => {
        const returnData = result.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(returnData);
      })
    }, []);

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <Calendar
        onChange={onChange}
        value={value}
      />  
      <h3>Events on {format(value, 'MM/dd/yyyy')}</h3>
      <ul>
          {posts.map(post =>
            <ViewCard post={post} key={post.id} />
          )}
        </ul>
        </Grid>
        <Grid item xs={9}>
        <ul>
          {posts.map(post =>
            <PostCard post={post} key={post.id} />
          )}
        </ul>
        </Grid>
      </Grid>
      
        {notification}
    </div>
  )
}
export default Posts;