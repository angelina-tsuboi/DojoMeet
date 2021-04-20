import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import {useFirestore} from '../firebase/useFirestore';
import PostCard from '../components/PostCard/PostCard';
const firestore = useFirestore();


const Posts = () => {
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
      
        {notification}

        <ul >
          {/* PostCard causes error */}
          {/* {posts.map(post =>
            // <li key={post.id}>
            //   <Link href="/posts/[id]" as={'/posts/' + post.id}>
            //     <a itemProp="hello">{post.title}</a>
            //   </Link>
            // </li>
            <PostCard post={post} key={post.id} />
          )} */}

      {posts.map(post =>
        <h1>{post.title}</h1>
      )}
        </ul>


    </div>
  )
}
export default Posts;