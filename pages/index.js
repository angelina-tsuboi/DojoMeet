import { useState, useEffect } from 'react';
import Head from 'next/head';
import CreatePost from '../components/CreatePost';
import fire from '../config/fire-conf';
import Link from 'next/link';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

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
  console.log(blogs)

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Epic Blog</h1>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link href="/blog/[id]" as={'/blog/' + blog.id}>
              <a>{blog.title}</a>
            </Link>
          </li>
        )}
      </ul>

      <CreatePost />
    </div>
  )
}
export default Home;