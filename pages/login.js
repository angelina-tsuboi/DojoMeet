import { useState, React } from 'react';
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Login from '../components/Landing/views/IndexSections/Login';



const LoginPage = () => {
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
    <Login />
  )
}
export default LoginPage;