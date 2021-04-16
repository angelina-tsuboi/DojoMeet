import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import fire from '../config/fire-conf';
import HomePage from '../components/HomePage/HomePage';
import Link from 'next/link';



const Home = () => {
  const [blogs, setBlogs] = useState([]);
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


  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }
  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Head>
        <title>Blog App</title>
      </Head>
      
        
        <h1>Recent Posts</h1>
        {notification}
        {!loggedIn
          ?
          <HomePage />
          :
          <div>
             <ul>
          {posts.map(post =>
            <li key={post.id}>
              <Link href="/posts/[id]" as={'/posts/' + post.id}>
                <a itemProp="hello">{post.title}</a>
              </Link>
            </li>
          )}
        </ul>
            <button onClick={handleLogout}>Logout</button>
          </div>
          
        }
    </div>
  )
}
export default Home;