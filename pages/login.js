import { useState } from 'react';
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import styles from '../styles/Login.module.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })
    setUsername('')
    setPassword('')
    router.push("/")
  }

  const handleGoogleLogin = () => {
    let provider = new fire.auth.GoogleAuthProvider();
    fire.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("got the user", user);
    fire.firestore().doc(`users/${user.uid}`).get().then(snapshot => {
      if(!snapshot.exists){
        const data = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName
        }
        fire.firestore().collection("users").doc(user.uid).set(data).then(() => {
          router.push("/");
        })
      }else{

        router.push("/")    
      }
    })
    
  }).catch((error) => {
    console.log("Error: ", error);
  });
  }
  
  return (
    // <div className={styles.container}>
    //   <h1>Welcome Back 🥋</h1>
    //   {notify}
    //   <form onSubmit={handleLogin}>
    //     <h3 className={styles.subtitle}>Email</h3>
    //     <input type="text" value={username} 
    //     onChange= {({target}) => setUsername(target.value)} className={styles.field}/>
    //     <br />
    //     <h3 className={styles.subtitle}>Password</h3>
    //     <input type="password" value={password} 
    //     onChange={({target}) => setPassword(target.value)} className={styles.field}/>
    //     <br />
    //     <button type="submit" className={styles.loginButton}>Login</button>

    //     <p>Already have an account? <Link href="register">Sign Up.</Link></p>
    //   </form>
    //   <h3>OR</h3>
    //   <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
    //   Login with Google
    // </Button>
    // </div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
export default Login;