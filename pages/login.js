import { useState } from 'react';
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import styles from '../styles/Login.module.css';
import Button from '@material-ui/core/Button';

const Login = () => {
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

  const handleGoogleSignUp = async() =>{
    const provider = fire.auth.GoogleAuthProvider();
    const creds = await fire.auth.signInWithPopup(provider);
    let user = creds.user;
    const userRef = fire.firestore().doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      name: user.displayName
    }

    userRef.get().then((doc) => {
      if(!doc.exists){
        userRef.set(data, {merge: true});
      }
    })

    router.push("/");
  }
  return (
    <div className={styles.container}>
      <h1>Welcome Back 🥋</h1>
      {notify}
      <form onSubmit={handleLogin}>
        <h3 className={styles.subtitle}>Email</h3>
        <input type="text" value={username} 
        onChange= {({target}) => setUsername(target.value)} className={styles.field}/>
        <br />
        <h3 className={styles.subtitle}>Password</h3>
        <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} className={styles.field}/>
        <br />
        <button type="submit" className={styles.loginButton}>Login</button>

        <p>Already have an account? <Link href="register">Sign Up.</Link></p>
      </form>
      <h3>OR</h3>
      <Button variant="contained" color="primary" onClick={handleGoogleSignUp}>
      Sign up with Google
    </Button>
    </div>
  )
}
export default Login;