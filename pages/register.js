import { useState } from 'react'; 
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import styles from '../styles/SignUp.module.css';

const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
       'Password and password confirmation does not   match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000)
      setPassword('');
      setPassConf('');
      return null;
      }
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
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
    // ...
  }).catch((error) => {
    console.log("Error: ", err);
  });

  }
  return (
    <div className={styles.container}>
      <h1>Create new user</h1>
        {notification}
      <form onSubmit={handleLogin}>
        <h3>Email:</h3>
       <input type="text" value={userName} 
        onChange={({target}) => setUsername(target.value)} /> 
        <br />
        <h3>Password:</h3>
        <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> 
        <br />
        <h3>Confirm Password:</h3>
        <input type="password" value={passConf}    
        onChange={({target}) => setPassConf(target.value)} /> 
        <br />
        <button type="submit">Login</button>
      </form>
      <h3>OR</h3>
      <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
      Login with Google
    </Button>
    </div>
  )
}
export default Register;