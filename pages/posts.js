import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import Link from 'next/link';
import PostCard from '../components/PostCard/PostCard';


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
      <Navbar loggedIn={loggedIn}/>
      <Head>
        <title>Blog App</title>
      </Head>
      
        
        <h1>Posts</h1>
        {notification}

        <ul>
          {posts.map(post =>
            // <li key={post.id}>
            //   <Link href="/posts/[id]" as={'/posts/' + post.id}>
            //     <a itemProp="hello">{post.title}</a>
            //   </Link>
            // </li>
            <PostCard post={post}/>
          )}
        </ul>


    </div>
  )
}
export default Posts;