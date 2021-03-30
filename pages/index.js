import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-conf';
import CreatePost from '../components/CreatePost';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from 'next/link';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
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
      <Head>
        <title>Blog App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
    </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <h1>Blog</h1>
        {notification}
        {!loggedIn
          ?
          <div>
            <Link href="/users/register">
              <a>Register</a>
            </Link> |
          <Link href="/users/login">
              <a> Login</a>
            </Link>
          </div>
          :
          <button onClick={handleLogout}>Logout</button>
        }
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}>
              <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                <a itemProp="hello">{blog.title}</a>
              </Link>
            </li>
          )}
        </ul>
        {loggedIn && <CreatePost />}
      </ThemeProvider>

    </div>
  )
}
export default Home;